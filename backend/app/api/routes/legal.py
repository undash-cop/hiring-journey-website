from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.json_list import decode_list, encode_list
from app.models import LegalDocument
from app.services.credits import LEGAL_VALIDATION_COST, deduct_credits, get_or_create_credit

router = APIRouter(prefix="/legal", tags=["legal"])

LEGAL_DOC_TYPES = {"offer-letter", "employment-contract", "nda", "non-compete", "other"}


class LegalDocumentItem(BaseModel):
    id: int
    type: str
    name: str
    status: str
    uploaded_at: datetime
    issues: list[str] | None = None


class LegalDocumentsResponse(BaseModel):
    items: list[LegalDocumentItem]


class CreateLegalDocumentRequest(BaseModel):
    type: str = Field(max_length=32)
    name: str = Field(min_length=1, max_length=255)


class ValidateLegalDocumentResponse(BaseModel):
    success: bool
    issues: list[str]


def _to_item(doc: LegalDocument) -> LegalDocumentItem:
    issues = decode_list(doc.issues)
    return LegalDocumentItem(
        id=doc.id,
        type=doc.doc_type,
        name=doc.name,
        status=doc.status,
        uploaded_at=doc.uploaded_at,
        issues=issues if issues else None,
    )


def _validate_document_rules(doc: LegalDocument) -> tuple[str, list[str]]:
    name_lower = doc.name.lower()
    issues: list[str] = []

    if doc.doc_type == "employment-contract":
        if "contract" not in name_lower:
            issues.append("Filename should clearly indicate employment contract")
        issues.append("Verify notice period and termination clauses")
    elif doc.doc_type == "offer-letter":
        issues.append("Confirm salary, benefits, and start date are explicit")
    elif doc.doc_type == "nda":
        issues.append("Review confidentiality scope and duration")
    elif doc.doc_type == "non-compete":
        issues.append("Validate duration and geographic restrictions")

    if len(name_lower) < 5:
        issues.append("Document name is too short to identify clearly")

    status_value = "validated" if not issues else "issues-found"
    return status_value, issues


@router.get("/documents", response_model=LegalDocumentsResponse)
async def list_legal_documents(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> LegalDocumentsResponse:
    docs = db.scalars(
        select(LegalDocument)
        .where(LegalDocument.user_sub == current_user.sub)
        .order_by(LegalDocument.uploaded_at.desc())
    ).all()
    return LegalDocumentsResponse(items=[_to_item(doc) for doc in docs])


@router.post("/documents", response_model=LegalDocumentItem, status_code=status.HTTP_201_CREATED)
async def create_legal_document(
    payload: CreateLegalDocumentRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> LegalDocumentItem:
    if payload.type not in LEGAL_DOC_TYPES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid document type")

    doc = LegalDocument(
        user_sub=current_user.sub,
        doc_type=payload.type,
        name=payload.name.strip(),
        status="pending",
        issues=encode_list([]),
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return _to_item(doc)


@router.post("/documents/{document_id}/validate", response_model=ValidateLegalDocumentResponse)
async def validate_legal_document(
    document_id: int,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ValidateLegalDocumentResponse:
    doc = db.get(LegalDocument, document_id)
    if not doc or doc.user_sub != current_user.sub:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")

    credit = get_or_create_credit(db, current_user.sub)
    try:
        deduct_credits(db, credit, LEGAL_VALIDATION_COST)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Insufficient credits for document validation.",
        ) from None

    status_value, issues = _validate_document_rules(doc)
    doc.status = status_value
    doc.issues = encode_list(issues)
    db.add(doc)
    db.commit()
    return ValidateLegalDocumentResponse(success=status_value == "validated", issues=issues)
