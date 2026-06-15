"""add interview, legal, auto-apply tables

Revision ID: 20260413_0009
Revises: 20260413_0008
Create Date: 2026-04-13 09:00:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "20260413_0009"
down_revision = "20260413_0008"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "interview_sessions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_sub", sa.String(length=128), nullable=False),
        sa.Column("interview_type", sa.String(length=16), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("questions_answered", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_interview_sessions_id"), "interview_sessions", ["id"], unique=False)
    op.create_index(op.f("ix_interview_sessions_user_sub"), "interview_sessions", ["user_sub"], unique=False)
    op.create_index(
        op.f("ix_interview_sessions_interview_type"), "interview_sessions", ["interview_type"], unique=False
    )

    op.create_table(
        "legal_documents",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_sub", sa.String(length=128), nullable=False),
        sa.Column("doc_type", sa.String(length=32), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="pending"),
        sa.Column("issues", sa.Text(), nullable=False, server_default="'[]'"),
        sa.Column("uploaded_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_legal_documents_id"), "legal_documents", ["id"], unique=False)
    op.create_index(op.f("ix_legal_documents_user_sub"), "legal_documents", ["user_sub"], unique=False)
    op.create_index(op.f("ix_legal_documents_doc_type"), "legal_documents", ["doc_type"], unique=False)

    op.create_table(
        "auto_apply_profiles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_sub", sa.String(length=128), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("1")),
        sa.Column("min_salary", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("locations", sa.Text(), nullable=False, server_default="'[]'"),
        sa.Column("job_types", sa.Text(), nullable=False, server_default="'[]'"),
        sa.Column("required_skills", sa.Text(), nullable=False, server_default="'[]'"),
        sa.Column("skill_match_threshold", sa.Integer(), nullable=False, server_default="70"),
        sa.Column("job_boards", sa.Text(), nullable=False, server_default="'[]'"),
        sa.Column("exclude_companies", sa.Text(), nullable=False, server_default="'[]'"),
        sa.Column("exclude_keywords", sa.Text(), nullable=False, server_default="'[]'"),
        sa.Column("resume_version", sa.String(length=128), nullable=True),
        sa.Column("daily_apply_limit", sa.Integer(), nullable=False, server_default="50"),
        sa.Column("apply_schedule", sa.String(length=16), nullable=False, server_default="daily"),
        sa.Column("applied_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_auto_apply_profiles_id"), "auto_apply_profiles", ["id"], unique=False)
    op.create_index(op.f("ix_auto_apply_profiles_user_sub"), "auto_apply_profiles", ["user_sub"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_auto_apply_profiles_user_sub"), table_name="auto_apply_profiles")
    op.drop_index(op.f("ix_auto_apply_profiles_id"), table_name="auto_apply_profiles")
    op.drop_table("auto_apply_profiles")
    op.drop_index(op.f("ix_legal_documents_doc_type"), table_name="legal_documents")
    op.drop_index(op.f("ix_legal_documents_user_sub"), table_name="legal_documents")
    op.drop_index(op.f("ix_legal_documents_id"), table_name="legal_documents")
    op.drop_table("legal_documents")
    op.drop_index(op.f("ix_interview_sessions_interview_type"), table_name="interview_sessions")
    op.drop_index(op.f("ix_interview_sessions_user_sub"), table_name="interview_sessions")
    op.drop_index(op.f("ix_interview_sessions_id"), table_name="interview_sessions")
    op.drop_table("interview_sessions")
