"""integer job and application primary keys

Revision ID: 20260413_0006
Revises: 20260413_0005
Create Date: 2026-04-13 12:00:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "20260413_0006"
down_revision = "20260413_0005"
branch_labels = None
depends_on = None


def upgrade() -> None:
    conn = op.get_bind()
    dialect = conn.dialect.name

    jobs_rows = conn.execute(
        sa.text(
            "SELECT id, title, location, remote, description, created_at, status "
            "FROM jobs ORDER BY created_at"
        )
    ).mappings().all()

    apps_rows = conn.execute(
        sa.text(
            "SELECT id, job_id, user_sub, status, cover_letter, resume_document_id, created_at "
            "FROM applications"
        )
    ).mappings().all()

    op.drop_table("applications")
    op.drop_table("jobs")

    op.create_table(
        "jobs",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("location", sa.String(length=255), nullable=False),
        sa.Column("remote", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="published"),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_jobs_location"), "jobs", ["location"], unique=False)
    op.create_index(op.f("ix_jobs_title"), "jobs", ["title"], unique=False)
    op.create_index(op.f("ix_jobs_status"), "jobs", ["status"], unique=False)

    op.create_table(
        "applications",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("job_id", sa.Integer(), nullable=False),
        sa.Column("user_sub", sa.String(length=128), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="submitted"),
        sa.Column("cover_letter", sa.Text(), nullable=True),
        sa.Column("resume_document_id", sa.String(length=128), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["job_id"], ["jobs.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_applications_job_id"), "applications", ["job_id"], unique=False)
    op.create_index(op.f("ix_applications_user_sub"), "applications", ["user_sub"], unique=False)

    job_old_to_new: dict[object, int] = {}
    for new_id, row in enumerate(jobs_rows, start=1):
        old_id = row["id"]
        st = row["status"]
        if st is None:
            st = "published"
        conn.execute(
            sa.text(
                "INSERT INTO jobs (id, title, location, remote, status, description, created_at) "
                "VALUES (:id, :title, :location, :remote, :status, :description, :created_at)"
            ),
            {
                "id": new_id,
                "title": row["title"],
                "location": row["location"],
                "remote": bool(row["remote"]),
                "status": st,
                "description": row["description"],
                "created_at": row["created_at"],
            },
        )
        job_old_to_new[old_id] = new_id

    for new_id, row in enumerate(apps_rows, start=1):
        old_job_id = row["job_id"]
        new_job_id = job_old_to_new.get(old_job_id)
        if new_job_id is None:
            continue
        conn.execute(
            sa.text(
                "INSERT INTO applications (id, job_id, user_sub, status, cover_letter, "
                "resume_document_id, created_at) "
                "VALUES (:id, :job_id, :user_sub, :status, :cover_letter, :resume_document_id, :created_at)"
            ),
            {
                "id": new_id,
                "job_id": new_job_id,
                "user_sub": row["user_sub"],
                "status": row["status"],
                "cover_letter": row["cover_letter"],
                "resume_document_id": row["resume_document_id"],
                "created_at": row["created_at"],
            },
        )

    if dialect == "postgresql":
        max_job = conn.scalar(sa.text("SELECT MAX(id) FROM jobs"))
        if max_job is None:
            conn.execute(
                sa.text("SELECT setval(pg_get_serial_sequence('jobs', 'id'), 1, false)")
            )
        else:
            conn.execute(
                sa.text("SELECT setval(pg_get_serial_sequence('jobs', 'id'), :m)"),
                {"m": max_job},
            )
        max_app = conn.scalar(sa.text("SELECT MAX(id) FROM applications"))
        if max_app is None:
            conn.execute(
                sa.text("SELECT setval(pg_get_serial_sequence('applications', 'id'), 1, false)")
            )
        else:
            conn.execute(
                sa.text("SELECT setval(pg_get_serial_sequence('applications', 'id'), :m)"),
                {"m": max_app},
            )


def downgrade() -> None:
    raise NotImplementedError("Downgrade would lose integer ID mapping; restore from backup instead.")
