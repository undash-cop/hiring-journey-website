# Staging Environment

Staging validates auth, API, and frontend integration before production releases.

## Topology

| Component | URL |
|-----------|-----|
| Frontend | `https://staging.hiringjourney.com` (Netlify branch) or deploy preview |
| API | `https://api-staging.hiringjourney.com` |
| Database | Postgres on staging VM (Docker Compose) |
| Identity | Keycloak — add staging redirect URIs to the client |

## API VM setup

1. Provision a Linux VM with Docker and Docker Compose.
2. Point DNS `api-staging.hiringjourney.com` A/AAAA record to the VM.
3. Copy env template:

```bash
cd backend
cp .env.staging.example .env.staging
# Edit secrets — never commit .env.staging
```

4. Obtain TLS certificates (Let's Encrypt) and set `SSL_CERT_PATH` / `SSL_KEY_PATH`.
5. Start stack:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.staging up -d --build
```

6. Smoke test:

```bash
curl -fsSL https://api-staging.hiringjourney.com/health
curl -fsSL https://api-staging.hiringjourney.com/ready
```

## Netlify staging site

Create a second Netlify site or branch deploy for `staging` branch with env vars from [`.env.staging.example`](../.env.staging.example) (copy values into Netlify UI — do not commit `.env.staging.local`):

```env
NEXT_PUBLIC_APP_URL=https://staging.hiringjourney.com
NEXT_PUBLIC_API_URL=https://api-staging.hiringjourney.com
NEXT_PUBLIC_KEYCLOAK_URL=...
NEXT_PUBLIC_KEYCLOAK_REALM=hiringjourney
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=hiringjourney-app
```

Local dev setup: [LOCAL_DEV.md](./LOCAL_DEV.md).

First-time staging setup: [STAGING_FIRST_DEPLOY.md](./STAGING_FIRST_DEPLOY.md).

## Keycloak

Add to the realm client:

- Valid redirect URIs: `https://staging.hiringjourney.com/auth/callback`, `https://staging.hiringjourney.com/app/login`
- Web origins: `https://staging.hiringjourney.com`

See [keycloak-redirect-uris.md](./keycloak-redirect-uris.md).

## Data policy

- Seed data only — no production PII.
- Reset staging DB freely between test cycles.
