# GitHub Actions Deploy Secrets

Configure these in **Settings → Secrets and variables → Actions** for API deploy workflows.

## Staging (`deploy-api-staging.yml`)

| Secret | Example | Description |
|--------|---------|-------------|
| `STAGING_SSH_HOST` | `staging.example.com` | Staging VM hostname |
| `STAGING_SSH_USER` | `deploy` | SSH user |
| `STAGING_SSH_KEY` | (private key) | SSH private key |
| `STAGING_DEPLOY_PATH` | `/opt/hiring-journey` | Git checkout path on VM |
| `STAGING_API_URL` | `https://api-staging.hiringjourney.com` | Public API base for smoke tests |

Create GitHub environment **staging** with optional approval gate.

## Production (`deploy-api-production.yml`)

| Secret | Example | Description |
|--------|---------|-------------|
| `PROD_SSH_HOST` | `api.example.com` | Production VM hostname |
| `PROD_SSH_USER` | `deploy` | SSH user |
| `PROD_SSH_KEY` | (private key) | SSH private key |
| `PROD_DEPLOY_PATH` | `/opt/hiring-journey` | Git checkout path on VM |
| `PROD_API_URL` | `https://api.hiringjourney.com` | Public API base for smoke tests |

Create GitHub environment **production** with required reviewers.

## VM bootstrap (one-time)

On each VM:

```bash
sudo mkdir -p /opt/hiring-journey
sudo chown deploy:deploy /opt/hiring-journey
git clone https://github.com/undash-cop/hiring-journey-website.git /opt/hiring-journey
cd /opt/hiring-journey/backend
cp .env.staging.example .env.staging   # or .env.production.example → .env.production
# Edit secrets, then start compose stack
```
