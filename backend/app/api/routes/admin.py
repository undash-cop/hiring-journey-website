from datetime import datetime, timezone
from typing import Literal

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.security import AuthUser, require_roles
from app.db import get_db
from app.job_serialization import decode_skills, encode_skills
from app.models import AdminAuditLog, Application, Job, UserCredit, UserProfile

router = APIRouter(prefix="/admin", tags=["admin"])


class JobPerformanceItem(BaseModel):
    job_id: int
    job_title: str
    applications: int
    conversions: int


class AdminStatsResponse(BaseModel):
    total_candidates: int
    active_jobs: int
    applications: int
    credit_usage: int
    funnel: dict[str, int]
    job_performance: list[JobPerformanceItem]


class AdminJobItem(BaseModel):
    id: int
    title: str
    description: str
    skills: list[str]
    location: str
    salary_range: dict[str, int]
    employment_type: str
    status: str
    applicant_count: int
    created_at: datetime
    source: str


class AdminApplicationItem(BaseModel):
    id: int
    job_id: int
    job_title: str
    candidate_id: int
    candidate_name: str
    status: str
    applied_at: datetime
    resume_score: int | None = None


class AdminCandidateItem(BaseModel):
    id: int
    name: str
    email: str
    resume_score: int
    credits_used: int
    credits_total: int
    status: str
    joined_at: datetime


class UpdateCandidateCreditsRequest(BaseModel):
    credits_total: int = Field(ge=0)


class UpdateCandidateStatusRequest(BaseModel):
    status: Literal["active", "suspended"]


class UpdateJobStatusRequest(BaseModel):
    status: Literal["draft", "published", "archived"]


class UpdateApplicationStatusRequest(BaseModel):
    status: Literal["submitted", "applied", "interview-scheduled", "interview-completed", "offer", "rejected"]


class PlanItem(BaseModel):
    id: int
    name: str
    credit_limit: int
    price: int
    usage: int


class PublishJobRequest(BaseModel):
    title: str
    description: str
    skills: list[str]
    location: str
    salary_range: dict[str, int]
    employment_type: str
    publish_to: list[str]


class PublishJobResponse(BaseModel):
    success: bool
    external_posting_ids: dict[str, str] | None = None


class AdminAuditLogItem(BaseModel):
    id: int
    actor_sub: str
    action: str
    resource_type: str
    resource_id: str
    old_value: str | None = None
    new_value: str | None = None
    created_at: datetime


def _log_admin_action(
    db: Session,
    actor_sub: str,
    action: str,
    resource_type: str,
    resource_id: str,
    old_value: str | None = None,
    new_value: str | None = None,
) -> None:
    db.add(
        AdminAuditLog(
            actor_sub=actor_sub,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            old_value=old_value,
            new_value=new_value,
        )
    )


@router.get("/stats", response_model=AdminStatsResponse)
async def get_admin_stats(
    _: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
) -> AdminStatsResponse:
    total_candidates = db.scalar(select(func.count()).select_from(UserProfile)) or 0
    active_jobs = (
        db.scalar(select(func.count()).select_from(Job).where(Job.status == "published")) or 0
    )
    total_applications = db.scalar(select(func.count()).select_from(Application)) or 0
    credit_usage = db.scalar(select(func.coalesce(func.sum(UserCredit.credits_used), 0))) or 0

    jobs = db.scalars(select(Job)).all()
    job_perf: list[JobPerformanceItem] = []
    for job in jobs:
        app_count = db.scalar(select(func.count()).select_from(Application).where(Application.job_id == job.id)) or 0
        conversion_count = (
            db.scalar(
                select(func.count()).select_from(Application).where(
                    Application.job_id == job.id, Application.status == "offer"
                )
            )
            or 0
        )
        job_perf.append(
            JobPerformanceItem(
                job_id=job.id,
                job_title=job.title,
                applications=app_count,
                conversions=conversion_count,
            )
        )

    return AdminStatsResponse(
        total_candidates=total_candidates,
        active_jobs=active_jobs,
        applications=total_applications,
        credit_usage=credit_usage,
        funnel={
            "applied": total_applications,
            "interviewScheduled": 0,
            "interviewCompleted": 0,
            "offer": db.scalar(
                select(func.count()).select_from(Application).where(Application.status == "offer")
            )
            or 0,
        },
        job_performance=job_perf,
    )


@router.get("/jobs", response_model=list[AdminJobItem])
async def get_admin_jobs(
    _: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
    limit: int = 50,
    offset: int = 0,
) -> list[AdminJobItem]:
    jobs = db.scalars(select(Job).order_by(Job.created_at.desc()).offset(offset).limit(limit)).all()
    response: list[AdminJobItem] = []
    for job in jobs:
        applicant_count = db.scalar(select(func.count()).select_from(Application).where(Application.job_id == job.id)) or 0
        response.append(
            AdminJobItem(
                id=job.id,
                title=job.title,
                description=job.description or "",
                skills=decode_skills(job.skills),
                location=job.location,
                salary_range={"min": job.salary_min, "max": job.salary_max},
                employment_type=job.employment_type,
                status=job.status,
                applicant_count=applicant_count,
                created_at=job.created_at,
                source=job.source,
            )
        )
    return response


@router.get("/applications", response_model=list[AdminApplicationItem])
async def get_admin_applications(
    _: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
    limit: int = 50,
    offset: int = 0,
) -> list[AdminApplicationItem]:
    apps = db.scalars(select(Application).order_by(Application.created_at.desc()).offset(offset).limit(limit)).all()
    jobs = {job.id: job for job in db.scalars(select(Job)).all()}
    profiles = {profile.keycloak_sub: profile for profile in db.scalars(select(UserProfile)).all()}
    response: list[AdminApplicationItem] = []
    for app in apps:
        profile = profiles.get(app.user_sub)
        job = jobs.get(app.job_id)
        response.append(
            AdminApplicationItem(
                id=app.id,
                job_id=app.job_id,
                job_title=job.title if job else str(app.job_id),
                candidate_id=profile.id if profile else 0,
                candidate_name=profile.full_name or profile.username or profile.email or "Candidate"
                if profile
                else "Candidate",
                status=app.status,
                applied_at=app.created_at,
                resume_score=85,
            )
        )
    return response


def _get_or_create_credit(db: Session, user_sub: str) -> UserCredit:
    credit = db.query(UserCredit).filter(UserCredit.user_sub == user_sub).one_or_none()
    if credit:
        return credit
    credit = UserCredit(user_sub=user_sub, credits_total=200, credits_used=0, status="active")
    db.add(credit)
    db.commit()
    db.refresh(credit)
    return credit


@router.get("/candidates", response_model=list[AdminCandidateItem])
async def get_admin_candidates(
    _: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
    limit: int = 50,
    offset: int = 0,
) -> list[AdminCandidateItem]:
    profiles = db.scalars(
        select(UserProfile).order_by(UserProfile.created_at.desc()).offset(offset).limit(limit)
    ).all()
    response: list[AdminCandidateItem] = []
    for profile in profiles:
        credit = _get_or_create_credit(db, profile.keycloak_sub)
        response.append(
            AdminCandidateItem(
                id=profile.id,
                name=profile.full_name or profile.username or "Candidate",
                email=profile.email or "",
                resume_score=85,
                credits_used=credit.credits_used,
                credits_total=credit.credits_total,
                status=credit.status,
                joined_at=profile.created_at,
            )
        )
    return response


@router.patch("/candidates/{candidate_id}/credits")
async def update_candidate_credits(
    candidate_id: int,
    payload: UpdateCandidateCreditsRequest,
    current_user: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
) -> dict[str, bool]:
    profile = db.get(UserProfile, candidate_id)
    if not profile:
        return {"success": False}
    credit = _get_or_create_credit(db, profile.keycloak_sub)
    old_total = credit.credits_total
    credit.credits_total = payload.credits_total
    credit.updated_at = datetime.now(tz=timezone.utc)
    db.add(credit)
    _log_admin_action(
        db=db,
        actor_sub=current_user.sub,
        action="update_credits",
        resource_type="candidate",
        resource_id=str(candidate_id),
        old_value=str(old_total),
        new_value=str(payload.credits_total),
    )
    db.commit()
    return {"success": True}


@router.patch("/candidates/{candidate_id}/status")
async def update_candidate_status(
    candidate_id: int,
    payload: UpdateCandidateStatusRequest,
    current_user: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
) -> dict[str, bool]:
    profile = db.get(UserProfile, candidate_id)
    if not profile:
        return {"success": False}
    credit = _get_or_create_credit(db, profile.keycloak_sub)
    old_status = credit.status
    credit.status = payload.status
    credit.updated_at = datetime.now(tz=timezone.utc)
    db.add(credit)
    _log_admin_action(
        db=db,
        actor_sub=current_user.sub,
        action="update_candidate_status",
        resource_type="candidate",
        resource_id=str(candidate_id),
        old_value=old_status,
        new_value=payload.status,
    )
    db.commit()
    return {"success": True}


@router.patch("/jobs/{job_id}/status")
async def update_job_status(
    job_id: int,
    payload: UpdateJobStatusRequest,
    current_user: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
) -> dict[str, bool]:
    model = db.get(Job, job_id)
    if not model:
        return {"success": False}
    old_status = model.status
    model.status = payload.status
    db.add(model)
    _log_admin_action(
        db=db,
        actor_sub=current_user.sub,
        action="update_job_status",
        resource_type="job",
        resource_id=str(job_id),
        old_value=old_status,
        new_value=payload.status,
    )
    db.commit()
    return {"success": True}


@router.patch("/applications/{application_id}/status")
async def update_application_status(
    application_id: int,
    payload: UpdateApplicationStatusRequest,
    current_user: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
) -> dict[str, bool]:
    model = db.get(Application, application_id)
    if not model:
        return {"success": False}
    old_status = model.status
    model.status = payload.status
    db.add(model)
    _log_admin_action(
        db=db,
        actor_sub=current_user.sub,
        action="update_application_status",
        resource_type="application",
        resource_id=str(application_id),
        old_value=old_status,
        new_value=payload.status,
    )
    db.commit()
    return {"success": True}


@router.get("/plans", response_model=list[PlanItem])
async def get_admin_plans(_: AuthUser = Depends(require_roles("admin"))) -> list[PlanItem]:
    return [
        PlanItem(id=1, name="Basic", credit_limit=100, price=29000, usage=45),
        PlanItem(id=2, name="Professional", credit_limit=200, price=59000, usage=120),
        PlanItem(id=3, name="Enterprise", credit_limit=500, price=149000, usage=320),
    ]


@router.post("/jobs/publish", response_model=PublishJobResponse)
async def publish_job(
    payload: PublishJobRequest,
    current_user: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
) -> PublishJobResponse:
    salary = payload.salary_range or {}
    job = Job(
        title=payload.title,
        location=payload.location,
        remote="remote" in payload.location.lower(),
        description=payload.description,
        skills=encode_skills(payload.skills),
        salary_min=int(salary.get("min", 0)),
        salary_max=int(salary.get("max", 0)),
        employment_type=payload.employment_type,
        status="published",
        source="internal",
    )
    db.add(job)
    db.flush()
    _log_admin_action(
        db=db,
        actor_sub=current_user.sub,
        action="publish_job",
        resource_type="job",
        resource_id=str(job.id),
        old_value=None,
        new_value=payload.title,
    )
    db.commit()
    external_posting_ids: dict[str, str] = {}
    if "linkedin" in payload.publish_to:
        external_posting_ids["linkedin"] = f"ln_{job.id}"
    if "indeed" in payload.publish_to:
        external_posting_ids["indeed"] = f"id_{job.id}"
    return PublishJobResponse(success=True, external_posting_ids=external_posting_ids or None)


@router.get("/audit-logs", response_model=list[AdminAuditLogItem])
async def get_admin_audit_logs(
    _: AuthUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
    limit: int = 50,
    offset: int = 0,
) -> list[AdminAuditLogItem]:
    rows = db.scalars(
        select(AdminAuditLog).order_by(AdminAuditLog.created_at.desc()).offset(offset).limit(limit)
    ).all()
    return [
        AdminAuditLogItem(
            id=row.id,
            actor_sub=row.actor_sub,
            action=row.action,
            resource_type=row.resource_type,
            resource_id=row.resource_id,
            old_value=row.old_value,
            new_value=row.new_value,
            created_at=row.created_at,
        )
        for row in rows
    ]
