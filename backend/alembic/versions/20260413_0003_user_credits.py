"""add user credits

Revision ID: 20260413_0003
Revises: 20260413_0002
Create Date: 2026-04-13 01:00:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "20260413_0003"
down_revision = "20260413_0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "user_credits",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_sub", sa.String(length=128), nullable=False),
        sa.Column("credits_total", sa.Integer(), nullable=False, server_default="200"),
        sa.Column("credits_used", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("status", sa.String(length=16), nullable=False, server_default="active"),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_user_credits_id"), "user_credits", ["id"], unique=False)
    op.create_index(op.f("ix_user_credits_user_sub"), "user_credits", ["user_sub"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_user_credits_user_sub"), table_name="user_credits")
    op.drop_index(op.f("ix_user_credits_id"), table_name="user_credits")
    op.drop_table("user_credits")
