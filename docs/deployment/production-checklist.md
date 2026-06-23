# M1 Deployment Checklist — Marketing + Auth Live

Use this checklist for the first production release: public marketing site, Keycloak auth, and API health endpoints.

## Sprint 1 — dev complete (deploy pending)

| Item | Status |
|------|--------|
| Auth callback + JWT `azp`/`aud` validation | Done locally |
| Protected `/app/*` routes + persisted session | Done |
| Auth error UX (`/?error=auth_failed` banner) | Done |
| Auth failure telemetry hook (`lib/auth-errors.ts`) | Done |
| Playwright auth route tests | Done |
| Local dev guide ([local-dev.md](../development/local-dev.md)) | Done |
| Staging env template (`.env.staging.example`) | Done |
| Staging deploy guide ([staging.md](./staging.md)) | Done |
| JWT `azp`/`aud` unit tests (`backend/tests/test_security.py`) | Done |
| Env template parity check (`npm run validate:env:parity`) | Done |
| API smoke script (`npm run smoke:api`) | Done |
| M1 marketing routes in Playwright (`e2e/marketing.spec.ts`) | Done |
| CI lint + env parity gates | Done |
| Staging API + Netlify deploy | **Not started** |
| Production M1 smoke tests | **Not started** |

## Prerequisites

- [ ] GitHub repo `undash-cop/hiring-journey-website` on `main`
- [ ] Netlify site connected to `main`
- [ ] Production VM with Docker for API
- [ ] DNS: `hiringjourney.com` → Netlify, `api.hiringjourney.com` → API VM
- [ ] Keycloak production realm configured

## 1. API (production VM)

Clone and deploy from the backend repository:

```bash
git clone https://github.com/undash-cop/hiring-journey-backend.git /opt/hiring-journey-backend
cd /opt/hiring-journey-backend
cp .env.production.example .env.production
# Set DATABASE_URL, KEYCLOAK_*, CORS_ORIGINS, TLS paths
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

Verify:

```bash
curl -fsSL https://api.hiringjourney.com/health
curl -fsSL https://api.hiringjourney.com/ready
curl -fsSL https://api.hiringjourney.com/openapi.json | head -c 200
```

## 2. Netlify (frontend)

Set environment variables (Site settings → Environment variables):

```env
NEXT_PUBLIC_APP_URL=https://hiringjourney.com
NEXT_PUBLIC_API_URL=https://api.hiringjourney.com
NEXT_PUBLIC_KEYCLOAK_URL=https://auth.hiringjourney.com
NEXT_PUBLIC_KEYCLOAK_REALM=hiringjourney
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=hiringjourney-app
```

Deploy: push to `main` or trigger deploy in Netlify UI.

## 3. Keycloak client

- [ ] Valid redirect URIs include `https://hiringjourney.com/auth/callback` and `/app/login`
- [ ] Web origins include `https://hiringjourney.com`
- [ ] Post-logout redirect URIs include `https://hiringjourney.com` and `/app/login`
- [ ] Silent SSO: `https://hiringjourney.com/silent-check-sso.html`

## 4. Smoke tests (production)

### Marketing

- [ ] `/` loads
- [ ] `/pricing`, `/features`, `/blog`, `/about`, `/contact` load
- [ ] `/sitemap.xml` and `/robots.txt` accessible
- [ ] Mobile layout OK on home and pricing

### Auth

- [ ] `/auth/login` redirects to `/app/login`
- [ ] `/app/login` redirects to Keycloak
- [ ] Successful login lands on `/app/dashboard`
- [ ] `/app/signup` starts Keycloak registration
- [ ] Logout returns to `/app/login`

### Product shell

- [ ] `/app/*` requires authentication (unauthenticated → Keycloak)
- [ ] `/app/admin/*` requires `admin` realm role
- [ ] Incomplete features show error/empty states (not silent mock data in prod)

## 5. Post-launch

- [ ] Configure analytics ([analytics.md](../development/analytics.md))
- [ ] Enable error monitoring (Sentry or equivalent)
- [ ] Document rollback: revert Netlify deploy + API image tag
