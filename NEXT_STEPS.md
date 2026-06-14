# Next Steps & Product Roadmap

This roadmap reflects the current architecture decision:
- Single web app on `https://hiringjourney.com`
- Product routes under `https://hiringjourney.com/app`
- Keycloak-owned authentication (no local auth form stack)

## Current Implementation Snapshot

- [x] Product shell and route structure exist under `/app/*`
- [x] Keycloak redirect entry routes are active (`/app/login`, `/app/signup`, `/app/forgot-password`)
- [x] Legacy duplicate auth pages/components removed
- [ ] Most product pages still need full backend-driven behavior and QA hardening

## Execution Principles

Each page is considered complete only when all items pass:
- [ ] Real API/data wiring complete (no placeholder or hardcoded demo state)
- [ ] Loading, empty, error, and success states implemented
- [ ] Primary user actions work end-to-end
- [ ] Basic analytics instrumentation added
- [ ] Accessibility checks pass (keyboard/labels/contrast)
- [ ] Route-level QA test coverage exists

## Phase 1 (Weeks 1-2): Auth and Platform Stabilization

- [x] Validate full auth callback path (`/app/login` -> Keycloak -> `/auth/callback` -> `/app/dashboard`) — verified locally; staging/prod pending deploy
- [x] Enforce protected route access checks across `/app/*`
- [x] Add auth error observability (redirect failures, callback failures, session expiry) — `lib/auth-errors.ts`, `sessionStorage` + console in dev
- [x] Confirm environment parity (local, preview, production) for Keycloak settings — templates + `npm run validate:env:parity` (Keycloak console URIs still manual; see [keycloak-redirect-uris.md](./docs/keycloak-redirect-uris.md))
- [x] Add integration tests for auth entry routes and callback handling — Playwright `e2e/auth-routes.spec.ts`

## Phase 2 (Weeks 2-4): Marketing Pages Full Completion

Routes: `/`, `/features`, `/pricing`, `/about`, `/blog/*`, `/careers/*`, `/contact`, legal pages

- [ ] Final content/data source wiring for each page
- [ ] CTA and form paths verified against `/app/*` routes
- [ ] SEO completion (title, description, canonical, OpenGraph, schema where needed)
- [ ] Performance pass on key landing routes
- [ ] Responsive and accessibility QA complete

## Phase 3 (Weeks 4-8): Candidate App Pages Full Completion

Routes: `/app/dashboard`, `/app/resume`, `/app/jobs`, `/app/auto-apply`, `/app/interview`, `/app/tracker`, `/app/negotiation`, `/app/legal`, `/app/coding-arena`, `/app/credits`, `/app/profile`, `/app/settings`

- [ ] Replace all placeholder blocks with real API-driven modules
- [ ] Implement core user actions per page (create, update, filter, save, submit flows)
- [ ] Add unified state handling (loading/empty/error) for every module
- [ ] Ensure cross-page navigation and data consistency
- [ ] Add route-level integration tests for core journeys

## Phase 4 (Weeks 8-10): Admin App Pages Completion

Routes: `/app/admin/dashboard`, `/app/admin/jobs`, `/app/admin/publish`, `/app/admin/applications`, `/app/admin/candidates`, `/app/admin/analytics`, `/app/admin/plans`, `/app/admin/settings`

- [ ] Implement role-based access controls and route guards
- [ ] Wire admin tables, filters, and action flows to real APIs
- [ ] Add audit-safe action handling (confirmations, failure recovery, logs where needed)
- [ ] Add regression tests for admin critical actions

## Phase 5 (Weeks 10-11): Billing and Monetization

- [ ] Pricing plans source-of-truth integration
- [ ] Checkout/session creation and redirect flow
- [ ] Subscription lifecycle (upgrade/downgrade/cancel) in UI + APIs
- [ ] Billing history and invoice visibility
- [ ] Payment failure/retry UX and support-safe messaging

## Phase 6 (Weeks 11-12): Quality Gate and Release Readiness

- [ ] Expand E2E coverage for top user funnels
- [ ] Add CI gates for lint, typecheck, tests, and build
- [ ] Integrate monitoring (errors + performance) and alerting
- [ ] Complete security and privacy checklist baseline
- [ ] Final documentation pass across architecture, deployment, and runbooks

## Milestone Targets

- **M1:** Auth/platform stable + marketing pages production-ready
- **M2:** Candidate `/app/*` pages functionally complete
- **M3:** Admin and billing complete
- **M4:** Release-quality hardening complete

## Environment Checklist

```env
# Keycloak
NEXT_PUBLIC_KEYCLOAK_URL=
NEXT_PUBLIC_KEYCLOAK_REALM=
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=

# App/backend
NEXT_PUBLIC_APP_URL=https://hiringjourney.com
NEXT_PUBLIC_API_URL=
```

## Definition of Done (Program-Level)

- [ ] No duplicate auth surfaces in code or docs
- [ ] All page routes have real data + complete state handling
- [ ] Critical funnels are covered by automated tests
- [ ] Production monitoring is active and actionable
- [ ] Documentation matches implemented behavior
