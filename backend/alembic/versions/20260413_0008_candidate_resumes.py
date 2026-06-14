"""add candidate resumes

Revision ID: 20260413_0008
Revises: 20260413_0007
Create Date: 2026-04-13 08:00:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "20260413_0008"
down_revision = "20260413_0007"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "candidate_resumes",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_sub", sa.String(length=128), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False, server_default="72"),
        sa.Column("target_role", sa.String(length=128), nullable=True),
        sa.Column("role_specific_score", sa.Integer(), nullable=True),
        sa.Column("ats_score", sa.Integer(), nullable=False, server_default="75"),
        sa.Column("keyword_match", sa.Integer(), nullable=False, server_default="68"),
        sa.Column("skills_gap", sa.Text(), nullable=False, server_default="'[]'"),
        sa.Column("suggestions", sa.Text(), nullable=False, server_default="'[]'"),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_candidate_resumes_id"), "candidate_resumes", ["id"], unique=False)
    op.create_index(op.f("ix_candidate_resumes_user_sub"), "candidate_resumes", ["user_sub"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_candidate_resumes_user_sub"), table_name="candidate_resumes")
    op.drop_index(op.f("ix_candidate_resumes_id"), table_name="candidate_resumes")
    op.drop_table("candidate_resumes")
