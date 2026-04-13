# Next Steps & Product Roadmap

## Current Baseline

- Marketing website is production-ready.
- Product shell exists under `/app/*`.
- Auth entry routes are Keycloak-only redirects:
  - `/app/login` -> `redirectToLogin()`
  - `/app/signup` -> `redirectToRegister()`
  - `/app/forgot-password` -> `redirectToLogin()`
- Duplicate local auth form pages/components were removed.

## Product Decisions (Locked)

1. **Identity Provider:** Keycloak is the source of truth for authentication.
2. **Marketing vs Product Split:** Marketing pages stay on main site, product experience runs under `/app/*`.
3. **No local auth forms in this repo:** Keep auth UI/logic in Keycloak unless explicitly reintroduced by product decision.

## Phase 1 (Now): Stabilize Auth + Core APIs

### Must ship
- [ ] Validate end-to-end callback reliability (`/auth/callback` -> `/app/dashboard`).
- [ ] Implement/verify server session validation for protected app routes.
- [ ] Add auth error telemetry (redirect failures, callback failures).
- [ ] Finalize Keycloak client settings for all environments.

### Supporting work
- [ ] Update stale docs to remove legacy `/api/auth/*` expectations for this repo.
- [ ] Add integration tests for `/app/login` and `/app/signup` redirect behavior.

## Phase 2: Core Product Functionality

### Dashboard APIs
- [ ] Resume management APIs and upload flow.
- [ ] Job application tracking APIs.
- [ ] Credits and usage APIs.
- [ ] Interview prep APIs.

### UX completion
- [ ] Replace placeholder/mock data in app dashboard views.
- [ ] Add empty/error/loading states across all key product pages.

## Phase 3: Monetization + Billing

- [ ] Pricing plans API source of truth.
- [ ] Checkout/session creation flow.
- [ ] Subscription lifecycle handling (upgrade/downgrade/cancel).
- [ ] Billing history + invoices.

## Phase 4: Reliability + Quality

- [ ] Unit tests for critical helpers and auth utilities.
- [ ] E2E tests for login -> callback -> dashboard flow.
- [ ] Error monitoring (Sentry) and performance budgets.
- [ ] CI gates for lint, typecheck, and tests.

## Environment Checklist

```env
# Keycloak
NEXT_PUBLIC_KEYCLOAK_URL=
NEXT_PUBLIC_KEYCLOAK_REALM=
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=

# App/backend
NEXT_PUBLIC_API_URL=
```

## Definition of Done (Current Milestone)

- [ ] No duplicate auth surfaces in app or docs.
- [ ] All auth entry routes consistently trigger Keycloak.
- [ ] Callback flow works in local, preview, and production.
- [ ] Team docs align with actual implementation choices.
