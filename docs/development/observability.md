# Observability

Error monitoring and analytics for Hiring Journey (frontend on Netlify, API on VM).

## Stack

| Layer | Tool | Endpoint / config |
|-------|------|-------------------|
| **Frontend errors** | Sentry (`@sentry/nextjs`) | `NEXT_PUBLIC_SENTRY_DSN` |
| **API errors** | Sentry (`sentry-sdk`) | `SENTRY_DSN` |
| **API metrics** | Prometheus (built-in) | `GET https://api.hiringjourney.com/metrics` |
| **Product analytics** | GA4 and/or Plausible | `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` |
| **Structured logs** | stdout + `X-Request-ID` | `LOG_LEVEL` on API |

Sentry is **optional**: if DSN env vars are unset, monitoring helpers no-op (local dev stays quiet).

## Sentry setup

### 1. Create projects

In [Sentry](https://sentry.io/), create two projects:

- **JavaScript / Next.js** → frontend DSN
- **Python / FastAPI** → backend DSN

### 2. Frontend (Netlify)

Add environment variables (Production):

```env
NEXT_PUBLIC_SENTRY_DSN=https://...@....ingest.sentry.io/...
SENTRY_DSN=https://...@....ingest.sentry.io/...
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1
NEXT_PUBLIC_APP_ENV=production
```

- `NEXT_PUBLIC_SENTRY_DSN` — browser errors, React boundaries, auth failures
- `SENTRY_DSN` — server-side Next.js errors (SSR)
- Sample rate `0.1` = 10% of transactions traced (adjust for cost)

Redeploy Netlify after saving vars.

### 3. Backend (API VM)

Add to `.env.production`:

```env
SENTRY_DSN=https://...@....ingest.sentry.io/...
SENTRY_TRACES_SAMPLE_RATE=0.1
APP_ENV=production
```

Rebuild API container:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build api
```

### 4. What is captured automatically

| Source | Events |
|--------|--------|
| `app/global-error.tsx` | Uncaught App Router errors |
| `ErrorBoundary` (product shell) | React render errors in `/app/*` |
| `lib/auth-errors.ts` | Keycloak callback / session failures |
| Axios + React Query | API **5xx** and network errors (not 401/403/404) |
| FastAPI + Sentry SDK | Unhandled server exceptions |
| Auth session | Sentry user context (`sub`, email) while logged in |

## Analytics (GA4 / Plausible)

See [analytics.md](./analytics.md). Set at least one on Netlify:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# and/or
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=hiringjourney.com
```

Custom events in `lib/analytics.ts` are sent to **both** GA4 (when `gtag` is loaded) and Plausible (when configured).

## Prometheus metrics (API)

The API exposes Prometheus metrics at `/metrics` (not in OpenAPI). Scrape from your monitoring stack or VM:

```bash
curl -fsSL https://api.hiringjourney.com/metrics | head
```

Use for request rates, latency histograms, and alerting (Grafana, Datadog agent, etc.).

## Request correlation

- API returns `X-Request-ID` on every response.
- API logs include `[request_id]` via `LOG_LEVEL=INFO`.
- Pass `X-Request-ID` from clients when debugging (optional future enhancement).

## Verification checklist

### Frontend

1. Deploy with `NEXT_PUBLIC_SENTRY_DSN` set.
2. Trigger a test error in browser console (staging only) or use Sentry's "Send test event".
3. Confirm auth error appears after a failed login attempt (`auth:callback_exchange_failed`).

### Backend

1. Deploy with `SENTRY_DSN` set.
2. Check API logs for `Sentry monitoring enabled`.
3. `curl /metrics` returns Prometheus text.
4. Optional: Sentry → send test event from Python project settings.

### Analytics

1. Visit `/` with GA Realtime or Plausible dashboard open.
2. Confirm page view within ~30 seconds.

## Alerting suggestions

| Alert | Condition |
|-------|-----------|
| API down | `/health` or `/ready` fails for 2+ minutes |
| Error spike | Sentry issues &gt; threshold in 1h |
| 5xx rate | Prometheus `http_requests_total{status=~"5.."}` |
| Netlify deploy fail | Netlify notification (built-in) |

## Related

- [analytics.md](./analytics.md) — GA4 / Plausible
- [operations/runbook.md](../operations/runbook.md) — incidents and rollback
- [deployment/production-checklist.md](../deployment/production-checklist.md) — launch checklist
