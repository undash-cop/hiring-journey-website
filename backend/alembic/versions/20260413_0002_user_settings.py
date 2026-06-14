"""add user settings

Revision ID: 20260413_0002
Revises: 20260413_0001
Create Date: 2026-04-13 00:30:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "20260413_0002"
down_revision = "20260413_0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "user_settings",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_sub", sa.String(length=128), nullable=False),
        sa.Column("email_notifications", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("sms_notifications", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("marketing_emails", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("auto_apply_enabled", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("skill_match_threshold", sa.Integer(), nullable=False, server_default="70"),
        sa.Column("preferred_locations", sa.Text(), nullable=False, server_default=""),
        sa.Column("preferred_job_types", sa.Text(), nullable=False, server_default=""),
        sa.Column("theme", sa.String(length=16), nullable=False, server_default="system"),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_user_settings_id"), "user_settings", ["id"], unique=False)
    op.create_index(op.f("ix_user_settings_user_sub"), "user_settings", ["user_sub"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_user_settings_user_sub"), table_name="user_settings")
    op.drop_index(op.f("ix_user_settings_id"), table_name="user_settings")
    op.drop_table("user_settings")
