# Staging deploy checklist

Use this when shipping a new API + frontend build to **staging** before production. Assumes topology from [staging.md](./staging.md).

## Pre-deploy (local / CI)

- [ ] `npm run validate:release` passes on **hiring-journey-website** `main`
- [ ] `pytest -q` passes in **hiring-journey-backend** `main`
- [ ] `npm run api:sync` clean (OpenAPI contract matches frontend)
- [ ] Review migration files since last staging deploy (`alembic/versions/`)

## 1. Backend — staging VM

SSH to the staging API host (`/opt/hiring-journey-backend` or your path).

### Pull and migrate

```bash
cd /opt/hiring-journey-backend
git fetch origin && git checkout main && git pull origin main
docker compose -f docker-compose.prod.yml --env-file .env.staging run --rm api alembic upgrade head
docker compose -f docker-compose.prod.yml --env-file .env.staging up -d --build
```

### Environment (`.env.staging`)

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | Postgres connection string |
| `CORS_ORIGINS` | Yes | Must include `https://staging.hiringjourney.com` (+ Netlify preview origins if used) |
| `KEYCLOAK_*` / `UDC_JWT_ISSUER` | Yes | Match staging Keycloak realm |
| `FRONTEND_URL` | Yes | `https://staging.hiringjourney.com` |
| `R2_*` | Recommended | Legal document storage (or `UPLOAD_DIR` for dev-only staging) |
| `RAZORPAY_*` | Optional | Mock checkout when unset; use test keys for billing smoke |
| `LLM_API_KEY` | Optional | OpenRouter key for interview LLM feedback; heuristics when unset |
| `LLM_API_BASE_URL` | Optional | Default `https://openrouter.ai/api/v1` |
| `LLM_MODEL` | Optional | Default `openai/gpt-4o-mini` |
| `SENTRY_DSN` | Recommended | API error monitoring |

### API smoke (from laptop or VM)

```bash
curl -fsSL https://api-staging.hiringjourney.com/health
curl -fsSL https://api-staging.hiringjourney.com/ready
API_BASE_URL=https://api-staging.hiringjourney.com npm run smoke:api
```

Confirm smoke hits new routes:

- [ ] `GET /billing/plans` → 200
- [ ] `GET /metrics` → 200 (Prometheus text)

## 2. Keycloak

Realm **hiringjourney** → client **hiringjourney-app**:

- [ ] Valid redirect URIs include `https://staging.hiringjourney.com/auth/callback` and `/app/login`
- [ ] Web origins include `https://staging.hiringjourney.com`
- [ ] Post-logout redirect URIs include `https://staging.hiringjourney.com` and `/`
- [ ] Silent SSO: `https://staging.hiringjourney.com/silent-check-sso.html`

Full URI list: [keycloak.md](./keycloak.md).

## 3. Frontend — Netlify

Deploy **hiring-journey-website** `main` (branch site or production branch for staging).

### Environment

```env
NEXT_PUBLIC_APP_URL=https://staging.hiringjourney.com
NEXT_PUBLIC_API_URL=https://api-staging.hiringjourney.com
NEXT_PUBLIC_KEYCLOAK_URL=https://secure.undash-cop.com
NEXT_PUBLIC_KEYCLOAK_REALM=hiringjourney
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=hiringjourney-app
# Optional:
# NEXT_PUBLIC_SENTRY_DSN=...
# NEXT_PUBLIC_GA_ID=...
```

- [ ] `NEXT_PUBLIC_USE_MOCK_API` is **not** set (or `false`)
- [ ] Build succeeds; publish deploy

## 4. End-to-end smoke (~20 min)

### Marketing

- [ ] `/`, `/pricing`, `/features` load over HTTPS
- [ ] `/pricing` shows plans from API (not static fallback only)

### Auth

- [ ] `/app/login` → Keycloak → `/auth/callback` → `/app/dashboard`
- [ ] Logout → marketing home `/`

### Candidate

- [ ] Dashboard loads stats
- [ ] Jobs → apply (credits deduct)
- [ ] `/app/coding-arena` → open Two Sum workspace → submit solution → test results
- [ ] `/app/interview` → feedback (heuristic or LLM if key set)
- [ ] `/app/legal` → upload → download
- [ ] `/app/credits` → subscription + billing history visible

### Admin (user with `admin` realm role)

- [ ] `/app/admin/jobs` → edit / publish draft
- [ ] `/app/admin/settings` → save platform settings
- [ ] `/app/admin/plans` → list plans

### Observability

- [ ] No new Sentry error spike in first 30 minutes
- [ ] API logs show successful requests (no migration errors)

## 5. Rollback (if needed)

| Layer | Action |
|-------|--------|
| API | `git checkout <previous-sha>` → rebuild compose → **only** downgrade DB if migration was destructive |
| Frontend | Netlify → Deploys → Publish previous deploy |
| Keycloak | Revert URI changes if you added preview-only origins |

See [runbook.md](../operations/runbook.md).

## Related

- [staging.md](./staging.md) — topology and first-time setup
- [release-readiness.md](./release-readiness.md) — M4 CI gates and prod smoke
- [security-privacy-checklist.md](../development/security-privacy-checklist.md)
