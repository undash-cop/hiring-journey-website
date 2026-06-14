from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.models import CandidateResume
from app.services.credits import RESUME_OPTIMIZATION_COST, deduct_credits, get_or_create_credit
from app.services.resume import (
    bump_score,
    get_or_create_resume,
    resume_skills_gap,
    resume_suggestions,
)

router = APIRouter(prefix="/resume", tags=["resume"])


class ResumeSummaryResponse(BaseModel):
    score: int
    suggestions: list[str]
    last_updated: datetime
    target_role: str | None = None
    role_specific_score: int | None = None
    ats_score: int
    keyword_match: int
    skills_gap: list[str]


class OptimizeResumeRoleRequest(BaseModel):
    target_role: str = Field(min_length=2, max_length=128)


class OptimizeResumeRoleResponse(BaseModel):
    success: bool
    new_score: int
    role_specific_score: int


class ImproveResumeResponse(BaseModel):
    success: bool
    new_score: int


def _to_summary(resume: CandidateResume) -> ResumeSummaryResponse:
    return ResumeSummaryResponse(
        score=resume.score,
        suggestions=resume_suggestions(resume),
        last_updated=resume.updated_at,
        target_role=resume.target_role,
        role_specific_score=resume.role_specific_score,
        ats_score=resume.ats_score,
        keyword_match=resume.keyword_match,
        skills_gap=resume_skills_gap(resume),
    )


@router.get("", response_model=ResumeSummaryResponse)
async def get_resume_summary(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ResumeSummaryResponse:
    resume = get_or_create_resume(db, current_user.sub)
    return _to_summary(resume)


@router.post("/improve", response_model=ImproveResumeResponse)
async def improve_resume(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ImproveResumeResponse:
    resume = get_or_create_resume(db, current_user.sub)
    credit = get_or_create_credit(db, current_user.sub)
    try:
        deduct_credits(db, credit, RESUME_OPTIMIZATION_COST)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Insufficient credits for resume optimization.",
        ) from None

    resume.score = bump_score(resume.score, 5)
    resume.ats_score = bump_score(resume.ats_score, 4)
    resume.keyword_match = bump_score(resume.keyword_match, 3)
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return ImproveResumeResponse(success=True, new_score=resume.score)


@router.post("/optimize-role", response_model=OptimizeResumeRoleResponse)
async def optimize_resume_for_role(
    payload: OptimizeResumeRoleRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> OptimizeResumeRoleResponse:
    resume = get_or_create_resume(db, current_user.sub)
    credit = get_or_create_credit(db, current_user.sub)
    try:
        deduct_credits(db, credit, RESUME_OPTIMIZATION_COST)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Insufficient credits for resume optimization.",
        ) from None

    resume.target_role = payload.target_role.strip()
    resume.score = bump_score(resume.score, 4)
    resume.role_specific_score = min(resume.score + 6, 100)
    resume.ats_score = bump_score(resume.ats_score, 3)
    resume.keyword_match = bump_score(resume.keyword_match, 5)
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return OptimizeResumeRoleResponse(
        success=True,
        new_score=resume.score,
        role_specific_score=resume.role_specific_score or resume.score,
    )
