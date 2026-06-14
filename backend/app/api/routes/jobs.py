from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.job_serialization import decode_skills
from app.models import Job

router = APIRouter(prefix="/jobs", tags=["jobs"])


class JobItem(BaseModel):
    id: int
    title: str
    description: str = ""
    location: str
    remote: bool
    skills: list[str] = Field(default_factory=list)
    salary_range: dict[str, int] = Field(
        default_factory=dict,
        json_schema_extra={"example": {"min": 0, "max": 0}},
    )
    employment_type: str
    status: str
    source: str
    created_at: datetime


class JobsListResponse(BaseModel):
    items: list[JobItem]
    next_cursor: str | None = None


def _job_to_item(job: Job) -> JobItem:
    return JobItem(
        id=job.id,
        title=job.title,
        description=job.description or "",
        location=job.location,
        remote=job.remote,
        skills=decode_skills(job.skills),
        salary_range={"min": job.salary_min, "max": job.salary_max},
        employment_type=job.employment_type,
        status=job.status,
        source=job.source,
        created_at=job.created_at,
    )


@router.get("", response_model=JobsListResponse)
async def list_jobs(
    _: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
    query: str | None = Query(default=None, description="Search query"),
    limit: int = Query(default=20, ge=1, le=100),
) -> JobsListResponse:
    stmt = (
        select(Job)
        .where(Job.status == "published")
        .order_by(Job.created_at.desc())
        .limit(limit)
    )
    if query:
        q = query.strip().lower()
        stmt = stmt.where((Job.title.ilike(f"%{q}%")) | (Job.location.ilike(f"%{q}%")))

    jobs = db.scalars(stmt).all()
    items = [_job_to_item(job) for job in jobs]
    return JobsListResponse(items=items, next_cursor=None)


@router.get("/{job_id}", response_model=JobItem)
async def get_job(
    job_id: int, _: AuthUser = Depends(get_current_user), db: Session = Depends(get_db)
) -> JobItem:
    job = db.get(Job, job_id)
    if not job or job.status != "published":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    return _job_to_item(job)
