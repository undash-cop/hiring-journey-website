# Operations Runbook

## Health checks

| Endpoint | Expected | Action if failing |
|----------|----------|-------------------|
| `GET /health` | `{ "status": "ok" }` | Restart API container; check logs |
| `GET /ready` | `{ "status": "ready" }` | Check Postgres connectivity, migrations |
| `GET /metrics` | Prometheus text | Scrape for request rate/latency alerts |
| Netlify site | HTTP 200 on `/` | Check Netlify deploy logs |

## API deployment (production)

**Current status:** if `https://api.hiringjourney.com/health` returns 503, the API container is down. Full steps: [backend/docs/production-recovery.md](../backend/docs/production-recovery.md).

1. SSH to production VM.
2. Pull latest `main` (or checkout release tag).
3. Run migrations explicitly:

```bash
cd backend
docker compose -f docker-compose.prod.yml --env-file .env.production run --rm api alembic upgrade head
```

4. Rebuild and restart:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build api
```

5. Smoke test `/health` and `/ready`.
6. If OpenAPI contract changed, regenerate frontend client and deploy Netlify.

## Rollback (API)

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production down api
docker run -d --name hiring-journey-api --env-file .env.production -p 8000:8000 hiring-journey-api:previous-tag
```

Restore DB from backup only if a migration caused data issues.

## Rollback (frontend)

Netlify → Deploys → select previous successful deploy → **Publish deploy**.

## Keycloak outage

- Users cannot log in; marketing pages remain available.
- Display status message on `/app/login` if Keycloak health check fails (future enhancement).
- Escalate to Keycloak operator; no local auth fallback.

## Database backup

Daily cron on API VM (see `backend/scripts/backup-db.sh`):

```bash
0 2 * * * /opt/hiring-journey/backend/scripts/backup-db.sh
```

Monthly: restore backup to staging and verify.

## Dual-instance API (zero-downtime)

Use `docker-compose.prod-ha.yml` with Nginx upstream (`backend/deploy/nginx/api-upstream.conf`). Deploy one instance at a time:

1. Update `api-2`, verify health.
2. Update `api-1`, verify health.
3. Nginx keeps routing to healthy upstreams.

## Monitoring alerts

Configure before M4 launch ([observability.md](../development/observability.md)):

| Alert | Condition |
|-------|-----------|
| API down | `/health` fails 2+ minutes |
| Site down | `https://hiringjourney.com` fails |
| Error spike | Sentry issue rate threshold |
| 5xx rate | Prometheus `http_requests_total{status=~"5.."}` |

- Uptime monitor on `https://api.hiringjourney.com/health` (1 min interval)
- Uptime monitor on `https://hiringjourney.com`

## Incident contacts

Document your on-call rotation and Keycloak admin access in your internal wiki (not in this repo).
