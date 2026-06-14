"""Tests admin rate-limit middleware in isolation (no full FastAPI app import cycle)."""

from starlette.applications import Starlette
from starlette.responses import PlainTextResponse
from starlette.routing import Route
from starlette.testclient import TestClient

from app.core.admin_rate_limit import AdminRateLimitMiddleware


async def _admin_ok(_request):
    return PlainTextResponse("ok")


def test_admin_rate_limit_middleware_429() -> None:
    starlette_app = Starlette(routes=[Route("/admin/ping", _admin_ok)])
    app = AdminRateLimitMiddleware(starlette_app, requests_per_minute=2)
    with TestClient(app) as client:
        assert client.get("/admin/ping").status_code == 200
        assert client.get("/admin/ping").status_code == 200
        r = client.get("/admin/ping")
        assert r.status_code == 429
        assert "detail" in r.json()


def test_admin_rate_limit_skips_non_admin_paths() -> None:
    async def root(_request):
        return PlainTextResponse("hi")

    starlette_app = Starlette(
        routes=[
            Route("/", root),
            Route("/admin/ping", _admin_ok),
        ]
    )
    app = AdminRateLimitMiddleware(starlette_app, requests_per_minute=2)
    with TestClient(app) as client:
        for _ in range(5):
            assert client.get("/").status_code == 200
