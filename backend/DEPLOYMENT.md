# Hiring Journey API Deployment

Production deployment guide for the FastAPI backend at `https://api.hiringjourney.com`.

## 1) Prerequisites

- Linux server/VM with Docker installed
- DNS A/AAAA record for `api.hiringjourney.com` pointing to your server
- TLS termination via Nginx/Caddy/load-balancer
- Keycloak production realm/client configured
- Production database (Postgres recommended)

## 2) Environment setup

1. Copy production template:

```bash
cp .env.production.example .env.production
```

2. Set production values:

- `DATABASE_URL` -> managed Postgres URL
- `CORS_ORIGINS` -> frontend domains only
- `KEYCLOAK_*` -> production realm/client values
- `API_BASE_URL=https://api.hiringjourney.com`

## 3) Build and run with Docker

From `backend/` directory:

```bash
docker build -t hiring-journey-api:latest .
docker run -d \
  --name hiring-journey-api \
  --restart unless-stopped \
  --env-file .env.production \
  -p 8000:8000 \
  hiring-journey-api:latest
```

Notes:

- Container startup runs `alembic upgrade head` before API startup.
- Releases are typically a single API instance: rebuild the image, restart the container (brief downtime), or stop the old container and start the new one.

## 3b) One-command compose stack (API + Postgres + Nginx)

1. Copy compose env template:

```bash
cp .env.production.compose.example .env.production
```

2. Update secrets/paths in `.env.production`:

- Postgres credentials
- `DATABASE_URL` (must point to `db` service host for compose)
- TLS certificate/key host paths

3. Start stack:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

4. Check services:

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f api
```

## 4) Reverse proxy (Nginx example)

```nginx
server {
  listen 80;
  server_name api.hiringjourney.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name api.hiringjourney.com;

  # Configure your cert paths (Let's Encrypt or managed certs)
  ssl_certificate /etc/letsencrypt/live/api.hiringjourney.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.hiringjourney.com/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

## 5) Health and smoke checks

After deploy:

```bash
curl -fsSL https://api.hiringjourney.com/health
curl -fsSL https://api.hiringjourney.com/ready
curl -fsSL https://api.hiringjourney.com/openapi.json > /tmp/openapi.json
```

Expected:

- `/health` returns `{ "status": "ok" }`
- `/ready` returns `{ "status": "ready" }` when the database is reachable, or `503` if not
- `/openapi.json` is accessible and up to date

If using compose and Nginx container, run checks against public domain after DNS + TLS are ready.

## 6) Release flow

1. Pull latest backend code
2. Build new image tag
3. Start new container with new tag
4. Verify `/health` and `/ready`
5. Replace or restart the running container with the new image
6. Regenerate frontend client from latest OpenAPI if backend contract changed

## 7) High availability (optional)

For rolling deploys with minimal downtime, use two API replicas behind Nginx:

```bash
docker compose -f docker-compose.prod-ha.yml --env-file .env.production up -d --build
```

Nginx config: `deploy/nginx/api-upstream.conf`. Update `api-1`, verify `/health`, then update `api-2`.

## 8) Database backups

```bash
chmod +x scripts/backup-db.sh
BACKUP_DIR=/var/backups/hiring-journey ./scripts/backup-db.sh
```

Schedule daily via cron. See `docs/RUNBOOK.md` for restore procedure.

## 9) Security checklist

- Do not expose FastAPI directly to internet without TLS
- Restrict `CORS_ORIGINS` to required domains only
- Keep Keycloak audience/issuer values exact
- Use managed DB credentials and rotate periodically
- Store `.env.production` outside repository and access-controlled
