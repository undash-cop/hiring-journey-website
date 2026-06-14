import anyio
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy import text

from app.core.security import AuthUser, get_current_user
from app.db import engine

router = APIRouter(tags=["system"])


class HealthResponse(BaseModel):
    status: str


class ReadinessResponse(BaseModel):
    status: str


class MeResponse(BaseModel):
    sub: str
    email: str | None = None
    username: str | None = None
    roles: list[str]


def _db_ping_sync() -> None:
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))


@router.get("/health", response_model=HealthResponse)
async def healthcheck() -> HealthResponse:
    """Returns OK if the API process is running (no dependency checks)."""
    return HealthResponse(status="ok")


@router.get(
    "/ready",
    response_model=ReadinessResponse,
    responses={503: {"description": "Service not ready (e.g. database unreachable)"}},
)
async def readiness() -> ReadinessResponse | JSONResponse:
    """Optional check that the database accepts a connection; returns 503 if not."""
    try:
        await anyio.to_thread.run_sync(_db_ping_sync)
    except Exception:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "unavailable", "database": "disconnected"},
        )
    return ReadinessResponse(status="ready")


@router.get("/auth/me", response_model=MeResponse, tags=["auth"])
async def me(current_user: AuthUser = Depends(get_current_user)) -> MeResponse:
    return MeResponse(
        sub=current_user.sub,
        email=current_user.email,
        username=current_user.preferred_username,
        roles=current_user.roles,
    )
