from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.json_list import decode_list, encode_list
from app.models import AutoApplyProfile

router = APIRouter(prefix="/auto-apply", tags=["auto-apply"])


class AutoApplyProfileItem(BaseModel):
    id: int
    name: str
    is_active: bool
    min_salary: int
    locations: list[str]
    job_types: list[str]
    required_skills: list[str]
    skill_match_threshold: int
    job_boards: list[str]
    exclude_companies: list[str]
    exclude_keywords: list[str]
    resume_version: str | None = None
    daily_apply_limit: int
    apply_schedule: str
    created_at: datetime
    applied_count: int


class AutoApplyProfilesResponse(BaseModel):
    items: list[AutoApplyProfileItem]


class AutoApplyProfileWriteRequest(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    is_active: bool = True
    min_salary: int = Field(ge=0)
    locations: list[str] = Field(default_factory=list)
    job_types: list[str] = Field(default_factory=list)
    required_skills: list[str] = Field(default_factory=list)
    skill_match_threshold: int = Field(default=70, ge=0, le=100)
    job_boards: list[str] = Field(default_factory=list)
    exclude_companies: list[str] = Field(default_factory=list)
    exclude_keywords: list[str] = Field(default_factory=list)
    resume_version: str | None = None
    daily_apply_limit: int = Field(default=50, ge=1, le=200)
    apply_schedule: str = Field(default="daily", pattern="^(daily|weekly|custom)$")


class AutoApplyProfilePatchRequest(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=255)
    is_active: bool | None = None
    min_salary: int | None = Field(default=None, ge=0)
    locations: list[str] | None = None
    job_types: list[str] | None = None
    required_skills: list[str] | None = None
    skill_match_threshold: int | None = Field(default=None, ge=0, le=100)
    job_boards: list[str] | None = None
    exclude_companies: list[str] | None = None
    exclude_keywords: list[str] | None = None
    resume_version: str | None = None
    daily_apply_limit: int | None = Field(default=None, ge=1, le=200)
    apply_schedule: str | None = Field(default=None, pattern="^(daily|weekly|custom)$")


def _to_item(profile: AutoApplyProfile) -> AutoApplyProfileItem:
    return AutoApplyProfileItem(
        id=profile.id,
        name=profile.name,
        is_active=profile.is_active,
        min_salary=profile.min_salary,
        locations=decode_list(profile.locations),
        job_types=decode_list(profile.job_types),
        required_skills=decode_list(profile.required_skills),
        skill_match_threshold=profile.skill_match_threshold,
        job_boards=decode_list(profile.job_boards),
        exclude_companies=decode_list(profile.exclude_companies),
        exclude_keywords=decode_list(profile.exclude_keywords),
        resume_version=profile.resume_version,
        daily_apply_limit=profile.daily_apply_limit,
        apply_schedule=profile.apply_schedule,
        created_at=profile.created_at,
        applied_count=profile.applied_count,
    )


def _apply_write(profile: AutoApplyProfile, payload: AutoApplyProfileWriteRequest) -> None:
    profile.name = payload.name
    profile.is_active = payload.is_active
    profile.min_salary = payload.min_salary
    profile.locations = encode_list(payload.locations)
    profile.job_types = encode_list(payload.job_types)
    profile.required_skills = encode_list(payload.required_skills)
    profile.skill_match_threshold = payload.skill_match_threshold
    profile.job_boards = encode_list(payload.job_boards)
    profile.exclude_companies = encode_list(payload.exclude_companies)
    profile.exclude_keywords = encode_list(payload.exclude_keywords)
    profile.resume_version = payload.resume_version
    profile.daily_apply_limit = payload.daily_apply_limit
    profile.apply_schedule = payload.apply_schedule


@router.get("/profiles", response_model=AutoApplyProfilesResponse)
async def list_auto_apply_profiles(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AutoApplyProfilesResponse:
    profiles = db.scalars(
        select(AutoApplyProfile)
        .where(AutoApplyProfile.user_sub == current_user.sub)
        .order_by(AutoApplyProfile.created_at.desc())
    ).all()
    return AutoApplyProfilesResponse(items=[_to_item(profile) for profile in profiles])


@router.post("/profiles", response_model=AutoApplyProfileItem, status_code=status.HTTP_201_CREATED)
async def create_auto_apply_profile(
    payload: AutoApplyProfileWriteRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AutoApplyProfileItem:
    profile = AutoApplyProfile(user_sub=current_user.sub)
    _apply_write(profile, payload)
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return _to_item(profile)


@router.patch("/profiles/{profile_id}", response_model=AutoApplyProfileItem)
async def update_auto_apply_profile(
    profile_id: int,
    payload: AutoApplyProfilePatchRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AutoApplyProfileItem:
    profile = db.get(AutoApplyProfile, profile_id)
    if not profile or profile.user_sub != current_user.sub:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

    updates = payload.model_dump(exclude_unset=True)
    list_fields = {
        "locations",
        "job_types",
        "required_skills",
        "job_boards",
        "exclude_companies",
        "exclude_keywords",
    }
    for key, value in updates.items():
        if key in list_fields and value is not None:
            setattr(profile, key, encode_list(value))
        elif value is not None:
            setattr(profile, key, value)

    db.add(profile)
    db.commit()
    db.refresh(profile)
    return _to_item(profile)


@router.delete("/profiles/{profile_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_auto_apply_profile(
    profile_id: int,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    profile = db.get(AutoApplyProfile, profile_id)
    if not profile or profile.user_sub != current_user.sub:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    db.delete(profile)
    db.commit()
