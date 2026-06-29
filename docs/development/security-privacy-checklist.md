# Security & Privacy Baseline Checklist

Use before production releases and quarterly reviews. Items marked **auto** are covered by CI or code defaults.

## Authentication & authorization

- [ ] Keycloak is the only login surface (no local password forms in product) **auto**
- [ ] JWT validation checks issuer, audience (`azp`), and expiry (`backend/tests/test_security.py`) **auto**
- [ ] `/app/admin/*` requires `admin` realm role (`RealmRoleRoute`) **auto**
- [ ] Protected `/app/*` routes redirect unauthenticated users to Keycloak **auto**
- [ ] Admin API rate limiting enabled (`ADMIN_RATE_LIMIT_PER_MINUTE` > 0 in production)

## Secrets & configuration

- [ ] No secrets committed to git (`.env`, keys, DSNs in repo) **auto** (`.gitignore`)
- [ ] Production secrets only in Netlify env vars and API VM `.env.production`
- [ ] `npm run validate:env:parity` passes in CI **auto**
- [ ] CORS `CORS_ORIGINS` lists only trusted frontend origins (no `*`)

## Transport & headers

- [ ] `hiringjourney.com` and `api.hiringjourney.com` served over HTTPS only
- [ ] Keycloak redirect URIs match production URLs ([keycloak.md](../deployment/keycloak.md))
- [ ] API returns `X-Request-ID` for request correlation **auto**

## Data handling

- [ ] Legal documents stored in private R2 bucket (or `UPLOAD_DIR` only in dev)
- [ ] Legal downloads proxied through API (no public bucket URLs) **auto**
- [ ] User PII limited in logs (no JWT bodies, no file contents in logs)
- [ ] Postgres backups encrypted at rest (VM/disk policy)

## Payments

- [ ] Razorpay keys only in server env (`RAZORPAY_KEY_SECRET` never in frontend)
- [ ] Webhook signature verification enabled when `RAZORPAY_WEBHOOK_SECRET` is set **auto**
- [ ] Checkout amounts computed server-side from plan catalog **auto**

## Privacy (legal pages)

- [ ] `/legal/privacy` published and linked from footer **auto**
- [ ] `/legal/terms` includes subscription and payment terms **auto**
- [ ] `/legal/cookie-policy` published **auto**
- [ ] Analytics (GA4/Plausible) disclosed in privacy/cookie policy
- [ ] Contact form does not store submissions without consent notice

## Dependency & supply chain

- [ ] `npm ci` / lockfile used in CI builds **auto**
- [ ] Backend pinned in `pyproject.toml` / Docker image tags for prod deploys
- [ ] Review Dependabot or manual dependency updates before merge

## Incident response

- [ ] Sentry projects configured for frontend + API ([observability.md](./observability.md))
- [ ] Rollback procedure documented ([runbook.md](../operations/runbook.md))
- [ ] On-call / escalation contacts documented internally (not in public repo)
