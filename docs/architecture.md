# Architecture

## Repository layout

Two GitHub repositories:

| Repository | Contents | Deploy |
|------------|----------|--------|
| [hiring-journey-website](https://github.com/undash-cop/hiring-journey-website) | Next.js frontend only | Netlify |
| [hiring-journey-backend](https://github.com/undash-cop/hiring-journey-backend) | FastAPI API (full source) | Docker VM |

Clone the frontend, then optionally clone the API for local full-stack work:

```bash
git clone https://github.com/undash-cop/hiring-journey-website.git
cd hiring-journey-website
./scripts/clone-backend-dev.sh
```

The API is **not** part of the Netlify deploy; the browser calls `https://api.hiringjourney.com` via `NEXT_PUBLIC_API_URL`.

## Single web app on `/app`

- Marketing: `https://hiringjourney.com` (`/`, `/pricing`, `/features`, …)
- Product: `https://hiringjourney.com/app/*`
- API: `https://api.hiringjourney.com` (separate host)

## Authentication (Keycloak)

- Redirect-only entry routes (no local login forms):
  - `/app/login` → Keycloak login
  - `/app/signup` → Keycloak registration
  - `/app/forgot-password` → Keycloak recovery
- Callback: `/auth/callback` → `/app/dashboard`
- Legacy `/auth/login` redirects to `/app/login` via `proxy.ts`

## Pricing → signup flow

1. CTA on `/pricing` → `/app/signup`
2. `redirectToRegister()` → Keycloak
3. Callback → `/app/dashboard`

## API contract

- Backend publishes OpenAPI at `/openapi.json`
- Frontend uses generated TypeScript client (`lib/generated/api-client`)
- Sync: [development/api-client-sync.md](./development/api-client-sync.md)

## Environment variables

See `.env.example` (frontend) and `backend/.env.example` (API).
