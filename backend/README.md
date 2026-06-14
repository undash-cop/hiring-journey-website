# Hiring Journey API (FastAPI)

Independent backend service for Hiring Journey. This service is designed to run on a separate server and be deployed as `https://api.hiringjourney.com`.

## Goals

- Run independently from the Next.js frontend.
- Verify Keycloak JWT access tokens for protected APIs.
- Publish a stable OpenAPI contract consumed by generated frontend client code.

## Local development

1. Copy env file:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
pip install -e .
```

3. Run API:

```bash
uvicorn app.main:app --reload --port 8000
```

The OpenAPI document will be available at `http://localhost:8000/openapi.json`.

## Docker (local/prod-like)

Build and run:

```bash
docker build -t hiring-journey-api:local .
docker run --rm -p 8000:8000 --env-file .env.example hiring-journey-api:local
```

## Docker Compose (production stack)

```bash
cp .env.production.compose.example .env.production
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

## Keycloak settings

The backend validates bearer tokens using:

- `KEYCLOAK_SERVER_URL`
- `KEYCLOAK_REALM`
- `KEYCLOAK_AUDIENCE`

## Initial endpoints

- `GET /health` — process is up (no dependency checks)
- `GET /ready` — optional DB connectivity check (`503` if the database is unreachable)
- `GET /auth/me`
- `GET /users/me`
- `PATCH /users/me`
- `GET /jobs` — published jobs only (skills, salary, employment type, dates)
- `GET /jobs/{job_id}` — published only (404 otherwise)
- `POST /applications`
- `GET /applications`

## Database

- Default local DB: SQLite (`DATABASE_URL=sqlite:///./hiring_journey.db`)
- Schema is managed by Alembic
- Seed jobs are inserted on first boot

Run migrations before starting the app:

```bash
alembic upgrade head
```

## Production deployment

See `DEPLOYMENT.md` for:

- Docker production runbook
- `api.hiringjourney.com` reverse proxy setup
- TLS and environment configuration checklist
