# Backend API Plan

This is the implementation-ready API plan for the independent FastAPI backend at `https://api.hiringjourney.com`.

## Core APIs (Phase 1)

- `GET /health` - service healthcheck
- `GET /auth/me` - returns authenticated user profile from Keycloak token
- `GET /jobs` - paginated, filterable jobs list
- `GET /jobs/{job_id}` - single job details
- `POST /applications` - create application for authenticated user
- `GET /applications` - list authenticated user's applications
- `GET /applications/{application_id}` ✅ implemented
- `PATCH /applications/{application_id}` ✅ implemented

## Next APIs (Phase 2)

- `GET /users/me` ✅ implemented
- `PATCH /users/me` ✅ implemented
- `POST /documents/upload-url`
- `POST /documents`
- `GET /documents`
- `GET /applications/{application_id}`
- `PATCH /applications/{application_id}`
- `GET /applications/{application_id}/timeline`

## Admin / Recruiter APIs (Phase 3)

- `POST /jobs`
- `PATCH /jobs/{job_id}`
- `DELETE /jobs/{job_id}`
- `GET /jobs/{job_id}/applications`
- `PATCH /applications/{application_id}/status`

## Security & Contracts

- Keycloak JWT verification with issuer, audience, and signature validation
- Role-based access (`candidate`, `recruiter`, `admin`) via route dependencies
- OpenAPI published from backend and consumed by frontend generated client

## OpenAPI Sync Workflow

1. Run backend locally on `http://localhost:8000`
2. Download latest spec:
   - `npm run api:spec:download`
3. Generate frontend client:
   - `npm run api:client:generate`
4. Run combined:
   - `npm run api:sync`
