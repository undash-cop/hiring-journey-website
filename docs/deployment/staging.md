# Staging environment

Staging validates auth, API, and frontend integration before production.

## Topology

| Component | URL |
|-----------|-----|
| Frontend | `https://staging.hiringjourney.com` (Netlify branch) or deploy preview |
| API | `https://api-staging.hiringjourney.com` |
| Database | Postgres on staging VM (Docker Compose) |
| Identity | Keycloak — staging redirect URIs on the client |

## First-time setup

### 1. Keycloak

In realm **hiringjourney** → client **hiringjourney-app**:

| Setting | Value |
|---------|--------|
| Valid redirect URIs | `https://staging.hiringjourney.com/auth/callback`, `https://staging.hiringjourney.com/app/login`, Netlify preview URLs if used |
| Web origins | `https://staging.hiringjourney.com` |
| Post-logout redirect URIs | `https://staging.hiringjourney.com`, `https://staging.hiringjourney.com/` |
| Silent SSO | `https://staging.hiringjourney.com/silent-check-sso.html` |

Local dev URIs: [keycloak.md](./keycloak.md) and [local-dev.md](../development/local-dev.md).

### 2. Staging API VM

```bash
```bash
git clone https://github.com/undash-cop/hiring-journey-backend.git /opt/hiring-journey-backend
cd /opt/hiring-journey-backend
cp .env.staging.example .env.staging
# Edit: DATABASE_URL, POSTGRES_*, KEYCLOAK_*, CORS_ORIGINS, SSL paths
docker compose -f docker-compose.prod.yml --env-file .env.staging up -d --build
```

`CORS_ORIGINS` must include `https://staging.hiringjourney.com` and any Netlify preview origins.

Verify:

```bash
curl -fsSL https://api-staging.hiringjourney.com/health
curl -fsSL https://api-staging.hiringjourney.com/ready
API_BASE_URL=https://api-staging.hiringjourney.com npm run smoke:api
```

Run `npm run validate:env:parity` before deploy.

### 3. GitHub Actions (API auto-deploy)

Configure secrets in the **hiring-journey-backend** repo per [backend/docs/secrets.md](../../backend/docs/secrets.md). Create environment **staging**.

Pushes to `main` on **hiring-journey-backend** run `.github/workflows/deploy-staging.yml` (skipped until `STAGING_SSH_HOST` is set).

Manual: **Actions → Deploy API (Staging) → Run workflow**.

### 4. Netlify (frontend)

**Option A — branch site** for `staging`:

1. Netlify → Import repo → branch `staging`
2. Build: `npm run build`
3. Env vars from `.env.staging.example`:

```env
NEXT_PUBLIC_APP_URL=https://staging.hiringjourney.com
NEXT_PUBLIC_API_URL=https://api-staging.hiringjourney.com
NEXT_PUBLIC_KEYCLOAK_URL=https://secure.undash-cop.com
NEXT_PUBLIC_KEYCLOAK_REALM=hiringjourney
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=hiringjourney-app
```

4. Custom domain: `staging.hiringjourney.com`

**Option B — deploy previews** on PRs: set env in "Deploy previews" context; add preview URLs to Keycloak.

## Smoke tests

### Marketing

- [ ] `/`, `/pricing`, `/features` load over HTTPS

### Auth

- [ ] `/app/login` → Keycloak → `/auth/callback` → `/app/dashboard`
- [ ] `/auth/callback` without params → home with auth error banner
- [ ] Logout → `/app/login`

### API (authenticated)

- [ ] `GET /dashboard/candidate` returns 200
- [ ] `GET /jobs` returns job list

### CI

- [ ] GitHub CI green on `main`

## Data policy

- Seed data only — no production PII
- Reset staging DB freely between test cycles

## Rollback

- **API:** on VM, `git checkout <previous-sha>` and re-run compose
- **Frontend:** Netlify → Deploys → Publish previous deploy

## Related

- [production-checklist.md](./production-checklist.md)
- [operations/runbook.md](../operations/runbook.md)
