"""In-memory sliding window rate limit for /admin (single-instance deployments)."""

from collections import defaultdict, deque
import time

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


class AdminRateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, requests_per_minute: int) -> None:
        super().__init__(app)
        self.requests_per_minute = requests_per_minute
        self._hits: dict[str, deque[float]] = defaultdict(deque)

    async def dispatch(self, request: Request, call_next):
        if self.requests_per_minute <= 0:
            return await call_next(request)
        path = request.url.path
        if not path.startswith("/admin"):
            return await call_next(request)
        if request.method == "OPTIONS":
            return await call_next(request)

        now = time.monotonic()
        window = 60.0
        ip = _client_ip(request)
        dq = self._hits[ip]
        while dq and now - dq[0] > window:
            dq.popleft()
        if len(dq) >= self.requests_per_minute:
            rid = getattr(request.state, "request_id", None)
            headers = {"Retry-After": "60"}
            if rid:
                headers["X-Request-ID"] = rid
            return JSONResponse(
                status_code=429,
                content={"detail": "Too many admin requests; try again later."},
                headers=headers,
            )
        dq.append(now)
        return await call_next(request)
