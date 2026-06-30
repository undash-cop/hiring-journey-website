# Documentation

All project documentation lives under `docs/`. Start with the [repository README](../README.md) for quick setup.

## Architecture & planning

| Doc | Purpose |
|-----|---------|
| [architecture.md](./architecture.md) | Single-host `/app` model, auth flow, routing |
| [roadmap.md](./roadmap.md) | Product phases, milestones, open work |

## Development

| Doc | Purpose |
|-----|---------|
| [development/local-dev.md](./development/local-dev.md) | Frontend + backend on your machine |
| [development/troubleshooting.md](./development/troubleshooting.md) | Common dev issues |
| [development/analytics.md](./development/analytics.md) | GA4 / Plausible setup |
| [deployment/ga4-setup-checklist.md](./deployment/ga4-setup-checklist.md) | GA4 conversions, funnel, dashboard (operator) |
| [development/observability.md](./development/observability.md) | Sentry, metrics, alerting |
| [development/security-privacy-checklist.md](./development/security-privacy-checklist.md) | Security & privacy baseline |
| [development/api-client-sync.md](./development/api-client-sync.md) | OpenAPI spec → TypeScript client |

## Deployment

| Doc | Purpose |
|-----|---------|
| [deployment/frontend.md](./deployment/frontend.md) | Netlify (Next.js) |
| [backend/docs/deployment.md](../backend/docs/deployment.md) | API VM, Docker, TLS (backend repo) |
| [deployment/staging.md](./deployment/staging.md) | Staging topology and first deploy |
| [deployment/staging-deploy-checklist.md](./deployment/staging-deploy-checklist.md) | Repeatable staging ship checklist |
| [deployment/production-checklist.md](./deployment/production-checklist.md) | M1 production release |
| [deployment/release-readiness.md](./deployment/release-readiness.md) | M4 quality gate & launch |
| [deployment/keycloak.md](./deployment/keycloak.md) | Redirect URIs and origins |
| [deployment/secrets.md](./deployment/secrets.md) | API secrets (→ backend repo) |
| [deployment/github-setup.md](./deployment/github-setup.md) | One-time GitHub repo setup |

## Operations

| Doc | Purpose |
|-----|---------|
| [operations/runbook.md](./operations/runbook.md) | Rollback, backups, incidents |
