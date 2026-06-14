"""job skills salary employment source

Revision ID: 20260413_0007
Revises: 20260413_0006
Create Date: 2026-04-13 18:00:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "20260413_0007"
down_revision = "20260413_0006"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "jobs",
        sa.Column("skills", sa.Text(), nullable=False, server_default=sa.text("'[]'")),
    )
    op.add_column(
        "jobs",
        sa.Column("salary_min", sa.Integer(), nullable=False, server_default=sa.text("0")),
    )
    op.add_column(
        "jobs",
        sa.Column("salary_max", sa.Integer(), nullable=False, server_default=sa.text("0")),
    )
    op.add_column(
        "jobs",
        sa.Column(
            "employment_type",
            sa.String(length=32),
            nullable=False,
            server_default=sa.text("'full-time'"),
        ),
    )
    op.add_column(
        "jobs",
        sa.Column(
            "source",
            sa.String(length=32),
            nullable=False,
            server_default=sa.text("'internal'"),
        ),
    )


def downgrade() -> None:
    op.drop_column("jobs", "source")
    op.drop_column("jobs", "employment_type")
    op.drop_column("jobs", "salary_max")
    op.drop_column("jobs", "salary_min")
    op.drop_column("jobs", "skills")
