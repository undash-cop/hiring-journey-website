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

## User provisioning (Keycloak → database)

Keycloak holds identity; Postgres holds product data (`user_profiles`, `user_credits`, …). On the **first authenticated API request** for a non-admin user, the API creates profile + default credits (200) automatically via `get_current_user` → `provision_user_on_auth`. No separate signup webhook is required.

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

## Pricing → signup → billing

1. `/pricing` loads plans from `GET /billing/plans` (static fallback if API unavailable)
2. Free tier CTA → `/app/signup` → Keycloak
3. Paid tier CTA → `/app/login?redirect=/app/credits?plan={id}`
4. Checkout on `/app/credits` via Razorpay (mock mode when keys unset)

## Admin & platform config

- Admin routes under `/app/admin/*` (realm role `admin`)
- Job publish/edit, platform settings, and plan CRUD via `/admin/*` APIs
- Subscription catalog is source-of-truth in `subscription_plans` table

## API contract

- Backend publishes OpenAPI at `/openapi.json`
- Frontend uses generated TypeScript client (`lib/generated/api-client`) plus `apiRequest()` for newer routes (billing, admin extensions)
- Sync: [development/api-client-sync.md](./development/api-client-sync.md)

## Storage & integrations

| Feature | Backend | Notes |
|---------|---------|--------|
| Legal documents | Cloudflare R2 or local `UPLOAD_DIR` | [file_storage.py](../backend/app/services/file_storage.py) |
| Billing | Razorpay orders + webhooks | Mock checkout without keys |
| Coding arena | Python subprocess sandbox | `POST /coding/challenges/{id}/submit` |
| Interview feedback | OpenRouter (OpenAI-compatible) or heuristics | Set `LLM_API_KEY` to your OpenRouter key |
| Observability | Sentry + Prometheus `/metrics` | [observability.md](./development/observability.md) |

## Quality gate (CI)

Every PR runs lint, typecheck, build, route validators, backend `pytest`, OpenAPI sync check, and Playwright E2E. See [release-readiness.md](./deployment/release-readiness.md).

## Environment variables

See `.env.example` (frontend) and `backend/.env.example` (API).
