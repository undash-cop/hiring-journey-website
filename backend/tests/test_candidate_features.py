from fastapi.testclient import TestClient

from app.core.security import AuthUser, get_current_user
from app.main import app


def _override_candidate_user() -> AuthUser:
    return AuthUser(
        sub="features_test_sub",
        email="features@test.com",
        preferred_username="features_user",
        roles=["candidate"],
        raw_claims={},
    )


def test_interview_questions_and_sessions() -> None:
    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            questions = client.get("/interview/questions", params={"type": "hr"})
            assert questions.status_code == 200
            assert len(questions.json()["items"]) >= 1

            sessions = client.get("/interview/sessions")
            assert sessions.status_code == 200
            assert sessions.json()["total_sessions"] == 0
    finally:
        app.dependency_overrides.clear()


def test_negotiation_endpoints() -> None:
    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            frameworks = client.get("/negotiation/frameworks")
            assert frameworks.status_code == 200
            assert len(frameworks.json()["items"]) >= 1

            market = client.get("/negotiation/market-insights")
            assert market.status_code == 200
            assert market.json()["average_salary"] > 0
    finally:
        app.dependency_overrides.clear()


def test_legal_document_flow() -> None:
    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            created = client.post(
                "/legal/documents",
                json={"type": "offer-letter", "name": "Offer_Letter.pdf"},
            )
            assert created.status_code == 201
            doc_id = created.json()["id"]

            listed = client.get("/legal/documents")
            assert listed.status_code == 200
            assert len(listed.json()["items"]) == 1

            validated = client.post(f"/legal/documents/{doc_id}/validate")
            assert validated.status_code == 200
            assert "issues" in validated.json()
    finally:
        app.dependency_overrides.clear()


def test_auto_apply_profile_crud() -> None:
    app.dependency_overrides[get_current_user] = _override_candidate_user
    try:
        with TestClient(app) as client:
            created = client.post(
                "/auto-apply/profiles",
                json={
                    "name": "Frontend Remote",
                    "is_active": True,
                    "min_salary": 1000000,
                    "locations": ["Remote"],
                    "job_types": ["full-time"],
                    "required_skills": ["React"],
                    "skill_match_threshold": 75,
                    "job_boards": ["linkedin"],
                    "exclude_companies": [],
                    "exclude_keywords": [],
                    "daily_apply_limit": 25,
                    "apply_schedule": "daily",
                },
            )
            assert created.status_code == 201
            profile_id = created.json()["id"]

            listed = client.get("/auto-apply/profiles")
            assert listed.status_code == 200
            assert len(listed.json()["items"]) == 1

            updated = client.patch(
                f"/auto-apply/profiles/{profile_id}",
                json={"is_active": False},
            )
            assert updated.status_code == 200
            assert updated.json()["is_active"] is False

            deleted = client.delete(f"/auto-apply/profiles/{profile_id}")
            assert deleted.status_code == 204
    finally:
        app.dependency_overrides.clear()
