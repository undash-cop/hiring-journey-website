# M4 Release Readiness Checklist

Quality gate for production launches after Phases 1–5 (auth, marketing, candidate, admin, billing).

## Automated gates (CI)

These run on every PR and push to `main` ([`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)):

| Gate | Command / job |
|------|----------------|
| Env template parity | `npm run validate:env:parity` |
| Route map validators | `validate:marketing`, `validate:candidate`, `validate:admin` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Production build | `npm run build` |
| Backend tests | `pytest` (checked-out API repo) |
| OpenAPI contract | `npm run api:sync` + diff check |
| E2E smoke | `npm run test:e2e` (Playwright) |

Run locally before tagging a release:

```bash
npm run validate:release   # static validators + lint + typecheck
npm run build
npm run test:e2e           # requires build or dev server
cd backend && pytest -q    # if backend/ is cloned
npm run smoke:api          # against running API
```

## E2E funnel coverage

| Funnel | Spec file |
|--------|-----------|
| Auth entry routes | `e2e/auth-routes.spec.ts` |
| Marketing pages + CTAs | `e2e/marketing.spec.ts` |
| Candidate core journeys | `e2e/candidate-routes.spec.ts` |
| Admin operations | `e2e/admin-routes.spec.ts` |
| Cross-page funnels (pricing → login, dashboard → jobs, billing subscribe, admin publish) | `e2e/funnels.spec.ts` |

## Observability (production)

- [ ] `NEXT_PUBLIC_SENTRY_DSN` + `SENTRY_DSN` on Netlify
- [ ] `SENTRY_DSN` on API VM
- [ ] GA4 and/or Plausible configured ([analytics.md](../development/analytics.md), [ga4-setup-checklist.md](./ga4-setup-checklist.md))
- [ ] Uptime monitors on `/health` and `https://hiringjourney.com`
- [ ] Prometheus scrape or equivalent for `/metrics` ([observability.md](../development/observability.md))

## Security & privacy

Complete [security-privacy-checklist.md](../development/security-privacy-checklist.md).

## Deploy sequence

1. API: `alembic upgrade head` (includes `0014` contact, `0015` newsletter, `0016` interview Q&A) → rebuild container → `npm run smoke:api`
2. API env: set `SMTP_*`, `CONTACT_NOTIFY_EMAIL`, `LOW_CREDIT_ALERT_THRESHOLD` for transactional email ([backend `.env.example`](../../backend/.env.example))
3. Frontend: push `main` → Netlify build → verify `/` and `/app/login`
3. Keycloak: redirect URIs unchanged unless domain changed
4. Razorpay: webhook URL points to `https://api.hiringjourney.com/billing/webhook`
5. R2: legal upload/download smoke on `/app/legal`

## Post-release smoke (15 min)

- [ ] Marketing home, pricing, contact
- [ ] Login → dashboard → logout → `/`
- [ ] Apply to a job (credits deduct)
- [ ] Admin: list jobs, publish draft
- [ ] Credits: view subscription + billing history
- [ ] Sentry: no new error spike in first hour

## Rollback

- **Frontend:** Netlify → previous deploy → Publish
- **API:** previous Docker image tag ([runbook.md](../operations/runbook.md))
- **DB:** restore backup only if migration caused data loss

## Related

- [production-checklist.md](./production-checklist.md) — M1 first launch
- [roadmap.md](../roadmap.md) — milestone M4
