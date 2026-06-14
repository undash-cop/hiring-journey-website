from fastapi.testclient import TestClient

from app.core.security import AuthUser, get_current_user
from app.bootstrap import seed_default_jobs
from app.db import SessionLocal
from app.main import app
from app.models import UserCredit
from app.services.credits import DEFAULT_CREDITS_TOTAL, JOB_APPLICATION_COST


def _override_candidate_user() -> AuthUser:
    return AuthUser(
        sub="candidate_credits_sub",
        email="credits@test.com",
        preferred_username="credits_user",
        roles=["candidate"],
        raw_claims={},
    )


def test_credit_usage_starts_at_defaults() -> None:
    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            res = client.get("/users/me/credits/usage")
            assert res.status_code == 200
            body = res.json()
            assert body["total"] == DEFAULT_CREDITS_TOTAL
            assert body["used"] == 0
            assert body["remaining"] == DEFAULT_CREDITS_TOTAL
    finally:
        app.dependency_overrides.clear()


def test_apply_deducts_credits_and_updates_usage() -> None:
    with SessionLocal() as db:
        seed_default_jobs(db)

    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            job_id = client.get("/jobs").json()["items"][0]["id"]
            apply_res = client.post("/applications", json={"job_id": job_id})
            assert apply_res.status_code == 201
            assert apply_res.json()["status"] == "applied"

            usage_res = client.get("/users/me/credits/usage")
            assert usage_res.status_code == 200
            usage = usage_res.json()
            assert usage["used"] == JOB_APPLICATION_COST
            assert usage["remaining"] == DEFAULT_CREDITS_TOTAL - JOB_APPLICATION_COST

            dashboard_res = client.get("/dashboard/candidate")
            assert dashboard_res.status_code == 200
            assert dashboard_res.json()["credits_remaining"] == usage["remaining"]

            profile_res = client.get("/users/me")
            assert profile_res.status_code == 200
            profile = profile_res.json()
            assert profile["applications_count"] == 1
            assert profile["credits_remaining"] == usage["remaining"]
    finally:
        app.dependency_overrides.clear()


def test_apply_rejects_when_credits_exhausted() -> None:
    with SessionLocal() as db:
        seed_default_jobs(db)
        credit = UserCredit(
            user_sub="candidate_credits_sub",
            credits_total=JOB_APPLICATION_COST,
            credits_used=JOB_APPLICATION_COST,
            status="active",
        )
        db.add(credit)
        db.commit()

    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            job_id = client.get("/jobs").json()["items"][0]["id"]
            apply_res = client.post("/applications", json={"job_id": job_id})
            assert apply_res.status_code == 402
            assert "credit" in apply_res.json()["detail"].lower()
    finally:
        app.dependency_overrides.clear()
