import os

# Tests always use in-memory SQLite (StaticPool in app.db). Must run before any `app` import.
os.environ["DATABASE_URL"] = "sqlite:///:memory:"

import pytest

from app.db import Base, engine


@pytest.fixture(autouse=True)
def _reset_database() -> None:
    """Isolate tests: drop/create schema on the shared in-memory engine."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
