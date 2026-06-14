from datetime import datetime

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.models import Application

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


class ActivityItem(BaseModel):
    id: int
    type: str
    message: str
    timestamp: datetime


class TrendItem(BaseModel):
    date: str
    count: int


class CandidateDashboardResponse(BaseModel):
    resume_score: int
    credits_remaining: int
    applications_count: int
    interviews_count: int
    recent_activity: list[ActivityItem]
    applications_trend: list[TrendItem]


@router.get("/candidate", response_model=CandidateDashboardResponse)
async def get_candidate_dashboard(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CandidateDashboardResponse:
    apps = db.scalars(
        select(Application)
        .where(Application.user_sub == current_user.sub)
        .order_by(Application.created_at.desc())
    ).all()

    interviews_count = len([a for a in apps if "interview" in a.status])
    recent_activity = [
        ActivityItem(
            id=index + 1,
            type="application" if app.status == "submitted" else app.status,
            message=f"Application {app.id} is {app.status}",
            timestamp=app.created_at,
        )
        for index, app in enumerate(apps[:5])
    ]

    daily_counts: dict[str, int] = {}
    for app in apps:
        day = app.created_at.date().isoformat()
        daily_counts[day] = daily_counts.get(day, 0) + 1
    trend = [TrendItem(date=day, count=count) for day, count in sorted(daily_counts.items())]

    return CandidateDashboardResponse(
        resume_score=85,
        credits_remaining=150,
        applications_count=len(apps),
        interviews_count=interviews_count,
        recent_activity=recent_activity,
        applications_trend=trend,
    )
