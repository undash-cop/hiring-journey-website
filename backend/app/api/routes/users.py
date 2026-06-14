from datetime import datetime

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.models import Application, UserProfile
from app.services.credits import credits_remaining, get_or_create_credit

router = APIRouter(prefix="/users", tags=["users"])


class UserProfileResponse(BaseModel):
    keycloak_sub: str
    email: str | None = None
    username: str | None = None
    full_name: str | None = None
    headline: str | None = None
    updated_at: datetime
    applications_count: int = 0
    interviews_count: int = 0
    credits_remaining: int = 0


class UpdateUserProfileRequest(BaseModel):
    full_name: str | None = Field(default=None, max_length=255)
    headline: str | None = Field(default=None, max_length=255)


def _get_or_create_profile(db: Session, current_user: AuthUser) -> UserProfile:
    profile = db.query(UserProfile).filter(UserProfile.keycloak_sub == current_user.sub).one_or_none()
    if profile:
        return profile

    profile = UserProfile(
        keycloak_sub=current_user.sub,
        email=current_user.email,
        username=current_user.preferred_username,
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile


def _profile_stats(db: Session, user_sub: str) -> tuple[int, int, int]:
    apps = db.scalars(select(Application).where(Application.user_sub == user_sub)).all()
    applications_count = len(apps)
    interviews_count = len([app for app in apps if "interview" in app.status])
    credit = get_or_create_credit(db, user_sub)
    return applications_count, interviews_count, credits_remaining(credit)


def _to_profile_response(db: Session, profile: UserProfile) -> UserProfileResponse:
    applications_count, interviews_count, remaining = _profile_stats(db, profile.keycloak_sub)
    return UserProfileResponse(
        keycloak_sub=profile.keycloak_sub,
        email=profile.email,
        username=profile.username,
        full_name=profile.full_name,
        headline=profile.headline,
        updated_at=profile.updated_at,
        applications_count=applications_count,
        interviews_count=interviews_count,
        credits_remaining=remaining,
    )


@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserProfileResponse:
    profile = _get_or_create_profile(db, current_user)
    return _to_profile_response(db, profile)


@router.patch("/me", response_model=UserProfileResponse)
async def update_my_profile(
    payload: UpdateUserProfileRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserProfileResponse:
    profile = _get_or_create_profile(db, current_user)
    updates = payload.model_dump(exclude_unset=True)
    for key, value in updates.items():
        setattr(profile, key, value)
    profile.email = current_user.email
    profile.username = current_user.preferred_username
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return _to_profile_response(db, profile)
