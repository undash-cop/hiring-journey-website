from fastapi.testclient import TestClient

from app.bootstrap import seed_default_jobs
from app.core.security import AuthUser, get_current_user
from app.db import Base, SessionLocal, engine
from app.main import app


def _override_candidate_user() -> AuthUser:
    return AuthUser(
        sub="candidate_test_sub",
        email="candidate@test.com",
        preferred_username="candidate",
        roles=["candidate"],
        raw_claims={},
    )


def _override_admin_user() -> AuthUser:
    return AuthUser(
        sub="admin_test_sub",
        email="admin@test.com",
        preferred_username="admin",
        roles=["admin"],
        raw_claims={},
    )


def test_health_endpoint() -> None:
    with TestClient(app) as client:
        response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_ready_endpoint_database_ok() -> None:
    with TestClient(app) as client:
        response = client.get("/ready")
    assert response.status_code == 200
    assert response.json()["status"] == "ready"


def test_protected_routes_require_credentials() -> None:
    app.dependency_overrides.clear()
    try:
        with TestClient(app) as client:
            jobs = client.get("/jobs")
            assert jobs.status_code in (401, 403)
            me = client.get("/auth/me")
            assert me.status_code in (401, 403)
    finally:
        app.dependency_overrides.clear()


def test_admin_routes_reject_non_admin_role() -> None:
    with SessionLocal() as db:
        seed_default_jobs(db)

    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            res = client.get("/admin/jobs")
            assert res.status_code == 403
            assert "permission" in res.json()["detail"].lower()
    finally:
        app.dependency_overrides.clear()


def test_archived_job_hidden_and_not_applicable() -> None:
    with SessionLocal() as db:
        seed_default_jobs(db)

    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            items = client.get("/jobs").json()["items"]
            assert len(items) >= 1
            job_id = items[0]["id"]
    finally:
        app.dependency_overrides.clear()

    app.dependency_overrides[get_current_user] = _override_admin_user
    try:
        with TestClient(app) as client:
            patch_res = client.patch(f"/admin/jobs/{job_id}/status", json={"status": "archived"})
            assert patch_res.status_code == 200
    finally:
        app.dependency_overrides.clear()

    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            assert client.get(f"/jobs/{job_id}").status_code == 404
            apply_res = client.post("/applications", json={"job_id": job_id})
            assert apply_res.status_code == 404
    finally:
        app.dependency_overrides.clear()


def test_jobs_and_applications_flow() -> None:
    with SessionLocal() as db:
        seed_default_jobs(db)

    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            jobs_res = client.get("/jobs")
            assert jobs_res.status_code == 200
            jobs = jobs_res.json()["items"]
            assert len(jobs) >= 1
            job_id = jobs[0]["id"]
            assert isinstance(job_id, int)

            detail_res = client.get(f"/jobs/{job_id}")
            assert detail_res.status_code == 200
            assert detail_res.json()["id"] == job_id

            create_res = client.post("/applications", json={"job_id": job_id})
            assert create_res.status_code == 201
            created = create_res.json()
            assert isinstance(created["id"], int)
            assert created["job_id"] == job_id

            list_res = client.get("/applications")
            assert list_res.status_code == 200
            items = list_res.json()["items"]
            assert len(items) >= 1
            assert isinstance(items[0]["id"], int)
    finally:
        app.dependency_overrides.clear()


def test_admin_action_creates_audit_log() -> None:
    with SessionLocal() as db:
        seed_default_jobs(db)

    app.dependency_overrides[get_current_user] = _override_admin_user
    try:
        with TestClient(app) as client:
            jobs_res = client.get("/admin/jobs")
            assert jobs_res.status_code == 200
            jobs = jobs_res.json()
            if not jobs:
                return
            job_id = jobs[0]["id"]
            assert isinstance(job_id, int)

            update_res = client.patch(f"/admin/jobs/{job_id}/status", json={"status": "archived"})
            assert update_res.status_code == 200
            assert update_res.json()["success"] is True

            logs_res = client.get("/admin/audit-logs")
            assert logs_res.status_code == 200
            logs = logs_res.json()
            assert any(log["action"] == "update_job_status" for log in logs)
    finally:
        app.dependency_overrides.clear()
