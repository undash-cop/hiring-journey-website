# API client sync

The frontend TypeScript client is generated from the FastAPI OpenAPI spec.

## Prerequisites

Backend running locally:

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

## Refresh client

From the repo root:

```bash
npm run api:sync
```

Or step by step:

```bash
npm run api:spec:download    # saves openapi/hiring-journey-api.openapi.json
npm run api:client:generate  # writes lib/generated/api-client/
```

## When to sync

- After adding or changing backend routes
- Before merging frontend changes that depend on new API types
- After production API deploy if the contract changed (then redeploy Netlify)

## Security model

- Keycloak JWT: issuer, audience, and signature validation on protected routes
- Roles: `candidate`, `recruiter`, `admin` via route dependencies
- Live contract: `http://localhost:8000/docs` (local) or `https://api.hiringjourney.com/docs` (prod)
