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

## Phase 2 (Weeks 2-4): Marketing Pages Full Completion — done

Routes: `/`, `/features`, `/pricing`, `/about`, `/blog/*`, `/careers/*`, `/contact`, legal pages

- [x] Centralize marketing nav, CTAs, contact copy (`lib/marketing-nav.ts`, `lib/marketing-content.ts`)
- [x] Shared FAQ content + accordion (`lib/marketing-faq.ts`, `/faq`, home preview)
- [x] Legal + core pages SEO (OpenGraph images, breadcrumb JSON-LD, contact schema)
- [x] Contact form accessibility (label/input ids, semantic aside)
- [x] Marketing E2E coverage (legal, careers, FAQ, CTAs, skip link, form validation)
- [x] CTA route validation in CI (`npm run validate:marketing`)
- [x] Performance: below-fold dynamic imports on `/`, `/features`, `/pricing`
- [x] Skip-to-content link on marketing shell

## Phase 3 (Weeks 4-8): Candidate App Pages Full Completion — in progress

Routes: `/app/dashboard`, `/app/resume`, `/app/jobs`, `/app/auto-apply`, `/app/interview`, `/app/tracker`, `/app/negotiation`, `/app/legal`, `/app/coding-arena`, `/app/credits`, `/app/profile`, `/app/settings`

- [x] Gate mock-only routes with `FeatureUnavailable` when API is not live (`lib/candidate-features.ts`)
- [x] Centralized React Query keys + cross-page invalidation on job apply (`lib/query-keys.ts`)
- [x] Unified loading/empty/error states on live API pages (dashboard, jobs, tracker, profile, settings, credits)
- [x] Real credits + profile stats from backend (`user_credits`, apply deducts 5 credits)
- [x] Resume score overview + role optimization via live `/resume` API (advanced tabs remain mock/demo)
- [ ] Replace remaining placeholder blocks (interview, negotiation, legal, auto-apply pending backend)
- [ ] Implement core user actions per page (create, update, filter, save, submit flows) for mock-gated modules
- [x] Ensure cross-page navigation and data consistency for live APIs
- [x] Add route-level integration tests for core journeys (`e2e/candidate-routes.spec.ts`)
- [x] Candidate route map validation in CI (`npm run validate:candidate`)

**Still open (need backend APIs):**

- [ ] `/app/interview` — interview prep sessions, questions, feedback
- [ ] `/app/negotiation` — salary insights and negotiation frameworks
- [ ] `/app/legal` — legal document upload and validation
- [ ] `/app/auto-apply` — auto-apply profiles and bulk apply

Until those APIs ship, these routes show `FeatureUnavailable` in production (or mock data when `NEXT_PUBLIC_USE_MOCK_API=true`).

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
