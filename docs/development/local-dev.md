# Local development

Quick setup for Sprint 1 auth and API work on your machine.

## Prerequisites

- Node.js 22+
- Python 3.11+ (for local API — run `./scripts/clone-backend-dev.sh` first)
- Keycloak client redirect URIs for your dev origin (see [keycloak.md](../deployment/keycloak.md))

## Frontend

```bash
git clone https://github.com/undash-cop/hiring-journey-website.git
cd hiring-journey-website
cp .env.example .env.local
# Edit Keycloak + API URLs; set NEXT_PUBLIC_APP_URL to your dev port (3000 or 3001)
npm install
npm run dev
```

If port 3000 is in use, Next.js may bind to **3001**. Update:

- `NEXT_PUBLIC_APP_URL=http://localhost:3001`
- Keycloak **Valid redirect URIs**: `http://localhost:3001/auth/callback`, `http://localhost:3001/app/login`
- Backend `CORS_ORIGINS` must include `http://localhost:3001`

## Backend

```bash
./scripts/clone-backend-dev.sh   # once, if backend/ is not present
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```

Verify: `curl http://localhost:8000/health`

## Auth smoke test

1. Open `http://localhost:3000` (or `:3001`)
2. Go to `/app/login` → Keycloak → lands on `/app/dashboard`
3. Failed callback: visit `/auth/callback` → home banner with **Try signing in again**

Auth failures are logged to the browser console in dev and stored in `sessionStorage` under `hj_last_auth_error`.

## Env validation

```bash
npm run validate:env:parity   # staging/local template consistency
REQUIRE_BUILD_ENV=true npm run validate:env   # simulate CI build env check
```

## API smoke test

With backend running on port 8000:

```bash
npm run smoke:api
# or: API_BASE_URL=https://api-staging.hiringjourney.com npm run smoke:api
```

## E2E (Playwright)

```bash
npx playwright install chromium
npm run test:e2e
```

Set `PLAYWRIGHT_BASE_URL` if dev server is not on port 3000 (e.g. `http://localhost:3001`).

## Staging

See [staging.md](../deployment/staging.md) and copy `.env.staging.example` for Netlify staging variables.
