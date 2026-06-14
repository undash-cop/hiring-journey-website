from datetime import datetime

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.models import UserSettings

router = APIRouter(prefix="/users/me", tags=["settings"])


class UserSettingsResponse(BaseModel):
    email_notifications: bool
    sms_notifications: bool
    marketing_emails: bool
    auto_apply_enabled: bool
    skill_match_threshold: int
    preferred_locations: list[str]
    preferred_job_types: list[str]
    theme: str


class UpdateUserSettingsRequest(BaseModel):
    email_notifications: bool
    sms_notifications: bool
    marketing_emails: bool
    auto_apply_enabled: bool
    skill_match_threshold: int = Field(ge=0, le=100)
    preferred_locations: list[str] = Field(default_factory=list)
    preferred_job_types: list[str] = Field(default_factory=list)
    theme: str = "system"


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class CreditUsageResponse(BaseModel):
    total: int
    used: int
    remaining: int
    breakdown: dict[str, int]


def _split_csv(value: str) -> list[str]:
    return [part for part in value.split(",") if part]


def _to_csv(values: list[str]) -> str:
    return ",".join(v.strip() for v in values if v.strip())


def _get_or_create_settings(db: Session, user_sub: str) -> UserSettings:
    settings = db.query(UserSettings).filter(UserSettings.user_sub == user_sub).one_or_none()
    if settings:
        return settings
    settings = UserSettings(user_sub=user_sub)
    db.add(settings)
    db.commit()
    db.refresh(settings)
    return settings


@router.get("/settings", response_model=UserSettingsResponse)
async def get_user_settings(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserSettingsResponse:
    settings = _get_or_create_settings(db, current_user.sub)
    return UserSettingsResponse(
        email_notifications=settings.email_notifications,
        sms_notifications=settings.sms_notifications,
        marketing_emails=settings.marketing_emails,
        auto_apply_enabled=settings.auto_apply_enabled,
        skill_match_threshold=settings.skill_match_threshold,
        preferred_locations=_split_csv(settings.preferred_locations),
        preferred_job_types=_split_csv(settings.preferred_job_types),
        theme=settings.theme,
    )


@router.put("/settings", response_model=UserSettingsResponse)
async def update_user_settings(
    payload: UpdateUserSettingsRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserSettingsResponse:
    settings = _get_or_create_settings(db, current_user.sub)
    settings.email_notifications = payload.email_notifications
    settings.sms_notifications = payload.sms_notifications
    settings.marketing_emails = payload.marketing_emails
    settings.auto_apply_enabled = payload.auto_apply_enabled
    settings.skill_match_threshold = payload.skill_match_threshold
    settings.preferred_locations = _to_csv(payload.preferred_locations)
    settings.preferred_job_types = _to_csv(payload.preferred_job_types)
    settings.theme = payload.theme
    settings.updated_at = datetime.utcnow()
    db.add(settings)
    db.commit()
    db.refresh(settings)
    return UserSettingsResponse(
        email_notifications=settings.email_notifications,
        sms_notifications=settings.sms_notifications,
        marketing_emails=settings.marketing_emails,
        auto_apply_enabled=settings.auto_apply_enabled,
        skill_match_threshold=settings.skill_match_threshold,
        preferred_locations=_split_csv(settings.preferred_locations),
        preferred_job_types=_split_csv(settings.preferred_job_types),
        theme=settings.theme,
    )


@router.post("/password")
async def change_password(
    payload: ChangePasswordRequest,
    _: AuthUser = Depends(get_current_user),
) -> dict[str, bool]:
    # Placeholder endpoint until Keycloak password APIs are integrated server-side.
    _ = payload
    return {"success": True}


@router.get("/credits/usage", response_model=CreditUsageResponse)
async def get_credit_usage(_: AuthUser = Depends(get_current_user)) -> CreditUsageResponse:
    total = 200
    used = 50
    return CreditUsageResponse(
        total=total,
        used=used,
        remaining=total - used,
        breakdown={
            "resumeOptimization": 20,
            "interviewPrep": 15,
            "autoApply": 10,
            "negotiation": 5,
        },
    )
