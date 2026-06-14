from datetime import datetime

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.models import UserProfile

router = APIRouter(prefix="/users", tags=["users"])


class UserProfileResponse(BaseModel):
    keycloak_sub: str
    email: str | None = None
    username: str | None = None
    full_name: str | None = None
    headline: str | None = None
    updated_at: datetime


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


@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserProfileResponse:
    profile = _get_or_create_profile(db, current_user)
    return UserProfileResponse.model_validate(profile, from_attributes=True)


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
    return UserProfileResponse.model_validate(profile, from_attributes=True)
