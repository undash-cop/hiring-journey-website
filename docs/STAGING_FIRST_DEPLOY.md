# Staging first deploy — step-by-step

Use this once to bring up **staging** before M1 production. Assumes DNS and VMs are provisioned.

## 1. Keycloak (one-time)

In realm **hiringjourney** → client **hiringjourney-app**:

| Setting | Value |
|---------|--------|
| Valid redirect URIs | `https://staging.hiringjourney.com/auth/callback`, `https://staging.hiringjourney.com/app/login`, Netlify preview URLs if used |
| Web origins | `https://staging.hiringjourney.com` |
| Post-logout redirect URIs | `https://staging.hiringjourney.com`, `https://staging.hiringjourney.com/app/login` |
| Silent SSO | `https://staging.hiringjourney.com/silent-check-sso.html` |

Local dev URIs for port 3001 are documented in [LOCAL_DEV.md](./LOCAL_DEV.md).

## 2. Staging API VM

```bash
# On the VM (as deploy user)
git clone https://github.com/undash-cop/hiring-journey-website.git /opt/hiring-journey
cd /opt/hiring-journey/backend
cp .env.staging.example .env.staging
# Edit: DATABASE_URL, POSTGRES_*, KEYCLOAK_*, CORS_ORIGINS, SSL paths
docker compose -f docker-compose.prod.yml --env-file .env.staging up -d --build
```

Ensure `CORS_ORIGINS` includes:

- `https://staging.hiringjourney.com`
- Any Netlify deploy-preview origin you use

Verify:

```bash
curl -fsSL https://api-staging.hiringjourney.com/health
curl -fsSL https://api-staging.hiringjourney.com/ready
# or from repo root:
API_BASE_URL=https://api-staging.hiringjourney.com npm run smoke:api
```

Before deploy, run `npm run validate:env:parity` to confirm frontend/backend staging templates match.

## 3. GitHub Actions (API auto-deploy)

Configure secrets per [DEPLOY_SECRETS.md](./DEPLOY_SECRETS.md). Create environment **staging**.

After secrets exist, pushes to `main` run `.github/workflows/deploy-api-staging.yml` (skipped until `STAGING_SSH_HOST` is set).

Manual deploy: **Actions → Deploy API (Staging) → Run workflow**.

## 4. Netlify (frontend)

Option A — **branch site** for `staging`:

1. Netlify → Add site → Import repo → branch `staging` (or `main` with context)
2. Build: `npm run build` (from `netlify.toml`)
3. Env vars from [`.env.staging.example`](../.env.staging.example):

```env
NEXT_PUBLIC_APP_URL=https://staging.hiringjourney.com
NEXT_PUBLIC_API_URL=https://api-staging.hiringjourney.com
NEXT_PUBLIC_KEYCLOAK_URL=https://secure.undash-cop.com
NEXT_PUBLIC_KEYCLOAK_REALM=hiringjourney
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=hiringjourney-app
```

4. Custom domain: `staging.hiringjourney.com`

Option B — **deploy previews** on PRs: set the same env in Netlify “Deploy previews” context; add preview URLs to Keycloak redirect URIs.

## 5. Staging smoke tests

### Marketing

- [ ] `/`, `/pricing`, `/features` load over HTTPS

### Auth

- [ ] `/app/login` → Keycloak → `/auth/callback` → `/app/dashboard`
- [ ] `/auth/callback` without params → home with auth error banner
- [ ] Logout → `/app/login`

### API (authenticated)

- [ ] Browser network: `GET /dashboard/candidate` returns 200 (not 401)
- [ ] `GET /jobs` returns job list

### CI parity

- [ ] GitHub **CI** workflow green on `main` (typecheck, build, backend tests, E2E smoke)

## 6. Rollback

**API:** on VM, `git checkout <previous-sha>` and re-run compose up.

**Frontend:** Netlify → Deploys → Publish previous deploy.

## Related

- [STAGING.md](./STAGING.md) — topology
- [M1_DEPLOYMENT_CHECKLIST.md](./M1_DEPLOYMENT_CHECKLIST.md) — production checklist
- [RUNBOOK.md](./RUNBOOK.md) — incidents
