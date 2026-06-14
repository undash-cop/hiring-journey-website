from fastapi.testclient import TestClient

from app.core.security import AuthUser, get_current_user
from app.bootstrap import seed_default_jobs
from app.db import SessionLocal
from app.main import app
from app.services.credits import DEFAULT_CREDITS_TOTAL, RESUME_OPTIMIZATION_COST


def _override_candidate_user() -> AuthUser:
    return AuthUser(
        sub="resume_test_sub",
        email="resume@test.com",
        preferred_username="resume_user",
        roles=["candidate"],
        raw_claims={},
    )


def test_resume_summary_defaults() -> None:
    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            res = client.get("/resume")
            assert res.status_code == 200
            body = res.json()
            assert body["score"] >= 70
            assert isinstance(body["suggestions"], list)
            assert len(body["suggestions"]) >= 1
    finally:
        app.dependency_overrides.clear()


def test_optimize_role_deducts_credits_and_updates_score() -> None:
    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            before = client.get("/resume").json()["score"]
            optimize = client.post("/resume/optimize-role", json={"target_role": "Frontend Developer"})
            assert optimize.status_code == 200
            payload = optimize.json()
            assert payload["new_score"] >= before
            assert payload["role_specific_score"] >= payload["new_score"]

            usage = client.get("/users/me/credits/usage").json()
            assert usage["used"] == RESUME_OPTIMIZATION_COST
            assert usage["remaining"] == DEFAULT_CREDITS_TOTAL - RESUME_OPTIMIZATION_COST

            dashboard = client.get("/dashboard/candidate").json()
            assert dashboard["resume_score"] == payload["new_score"]
    finally:
        app.dependency_overrides.clear()


def test_duplicate_job_application_returns_conflict() -> None:
    with SessionLocal() as db:
        seed_default_jobs(db)

    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            job_id = client.get("/jobs").json()["items"][0]["id"]
            first = client.post("/applications", json={"job_id": job_id})
            assert first.status_code == 201

            duplicate = client.post("/applications", json={"job_id": job_id})
            assert duplicate.status_code == 409
            assert "already applied" in duplicate.json()["detail"].lower()
    finally:
        app.dependency_overrides.clear()
