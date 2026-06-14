from sqlalchemy import select
from sqlalchemy.orm import Session

from app.job_serialization import encode_skills
from app.models import Job


def seed_default_jobs(db: Session) -> None:
    existing = db.scalar(select(Job.id).limit(1))
    if existing:
        return

    db.add_all(
        [
            Job(
                title="Frontend Engineer",
                location="Bengaluru",
                remote=True,
                status="published",
                description="Build user-facing experiences for Hiring Journey.",
                skills=encode_skills(["React", "TypeScript", "Next.js", "Tailwind CSS"]),
                salary_min=18_00_000,
                salary_max=32_00_000,
                employment_type="full-time",
                source="internal",
            ),
            Job(
                title="Backend Engineer",
                location="Remote",
                remote=True,
                status="published",
                description="Build robust backend systems and APIs.",
                skills=encode_skills(["Python", "FastAPI", "PostgreSQL", "Docker"]),
                salary_min=20_00_000,
                salary_max=38_00_000,
                employment_type="full-time",
                source="internal",
            ),
        ]
    )
    db.commit()
