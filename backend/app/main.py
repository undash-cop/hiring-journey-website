from contextlib import asynccontextmanager
from uuid import uuid4

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect
from starlette.middleware.base import BaseHTTPMiddleware

from app.api.routes.applications import router as applications_router
from app.api.routes.admin import router as admin_router
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.jobs import router as jobs_router
from app.api.routes.resume import router as resume_router
from app.api.routes.settings import router as settings_router
from app.api.routes.system import router as system_router
from app.api.routes.users import router as users_router
from app.bootstrap import seed_default_jobs
from app.core.admin_rate_limit import AdminRateLimitMiddleware
from app.core.config import get_settings
from app.core.logging_config import configure_logging, request_id_ctx
from app.db import SessionLocal, engine

settings = get_settings()
configure_logging(settings.log_level)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    if inspect(engine).has_table("jobs"):
        with SessionLocal() as db:
            seed_default_jobs(db)
    yield


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Hiring Journey backend service",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    AdminRateLimitMiddleware,
    requests_per_minute=settings.admin_rate_limit_per_minute,
)


class RequestIdMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        request_id = request.headers.get("X-Request-ID", str(uuid4()))
        request.state.request_id = request_id
        token = request_id_ctx.set(request_id)
        try:
            response = await call_next(request)
            response.headers["X-Request-ID"] = request_id
            return response
        finally:
            request_id_ctx.reset(token)


app.add_middleware(RequestIdMiddleware)


app.include_router(system_router)
app.include_router(jobs_router)
app.include_router(applications_router)
app.include_router(users_router)
app.include_router(dashboard_router)
app.include_router(resume_router)
app.include_router(settings_router)
app.include_router(admin_router)
