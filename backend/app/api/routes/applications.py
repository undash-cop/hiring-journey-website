from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.models import Application, Job
from app.services.credits import JOB_APPLICATION_COST, deduct_credits, get_or_create_credit

router = APIRouter(prefix="/applications", tags=["applications"])


class CreateApplicationRequest(BaseModel):
    job_id: int = Field(ge=1)
    resume_document_id: str | None = None
    cover_letter: str | None = None


class ApplicationItem(BaseModel):
    id: int
    job_id: int
    user_sub: str
    status: str
    created_at: datetime


class ListApplicationsResponse(BaseModel):
    items: list[ApplicationItem]


class UpdateApplicationRequest(BaseModel):
    status: str | None = Field(default=None, max_length=32)
    cover_letter: str | None = None
    resume_document_id: str | None = None


@router.post("", response_model=ApplicationItem, status_code=status.HTTP_201_CREATED)
async def create_application(
    payload: CreateApplicationRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ApplicationItem:
    job_exists = db.get(Job, payload.job_id)
    if not job_exists or job_exists.status != "published":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    existing = db.scalar(
        select(Application).where(
            Application.user_sub == current_user.sub,
            Application.job_id == payload.job_id,
        )
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You have already applied to this job.",
        )

    credit = get_or_create_credit(db, current_user.sub)
    try:
        deduct_credits(db, credit, JOB_APPLICATION_COST)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Insufficient credits to apply for this job.",
        ) from None

    model = Application(
        job_id=payload.job_id,
        user_sub=current_user.sub,
        status="applied",
        cover_letter=payload.cover_letter,
        resume_document_id=payload.resume_document_id,
    )
    db.add(model)
    db.commit()
    db.refresh(model)
    return ApplicationItem(
        id=model.id,
        job_id=model.job_id,
        user_sub=model.user_sub,
        status=model.status,
        created_at=model.created_at,
    )


@router.get("", response_model=ListApplicationsResponse)
async def list_applications(
    current_user: AuthUser = Depends(get_current_user), db: Session = Depends(get_db)
) -> ListApplicationsResponse:
    records = db.scalars(
        select(Application)
        .where(Application.user_sub == current_user.sub)
        .order_by(Application.created_at.desc())
    ).all()
    items = [
        ApplicationItem(
            id=item.id,
            job_id=item.job_id,
            user_sub=item.user_sub,
            status=item.status,
            created_at=item.created_at,
        )
        for item in records
    ]
    return ListApplicationsResponse(items=items)


@router.get("/{application_id}", response_model=ApplicationItem)
async def get_application(
    application_id: int,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ApplicationItem:
    model = db.get(Application, application_id)
    if not model or model.user_sub != current_user.sub:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    return ApplicationItem(
        id=model.id,
        job_id=model.job_id,
        user_sub=model.user_sub,
        status=model.status,
        created_at=model.created_at,
    )


@router.patch("/{application_id}", response_model=ApplicationItem)
async def update_application(
    application_id: int,
    payload: UpdateApplicationRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ApplicationItem:
    model = db.get(Application, application_id)
    if not model or model.user_sub != current_user.sub:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")

    updates = payload.model_dump(exclude_unset=True)
    for key, value in updates.items():
        setattr(model, key, value)
    db.add(model)
    db.commit()
    db.refresh(model)
    return ApplicationItem(
        id=model.id,
        job_id=model.job_id,
        user_sub=model.user_sub,
        status=model.status,
        created_at=model.created_at,
    )
