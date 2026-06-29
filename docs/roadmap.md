# Next Steps & Product Roadmap

This roadmap reflects the current architecture decision:
- Single web app on `https://hiringjourney.com`
- Product routes under `https://hiringjourney.com/app`
- Keycloak-owned authentication (no local auth form stack)

## Current Implementation Snapshot

- [x] Product shell and route structure exist under `/app/*`
- [x] Keycloak redirect entry routes are active (`/app/login`, `/app/signup`, `/app/forgot-password`)
- [x] Legacy duplicate auth pages/components removed
- [x] Candidate, admin, and billing routes wired to live APIs (Phases 3–5)
- [x] Quality gate CI and release docs in place (Phase 6)

**Post-M4 (deploy / ops — not feature code):** staging and production env secrets, observability DSNs, Keycloak URI parity on each host, and post-deploy smoke. See [staging-deploy-checklist.md](./deployment/staging-deploy-checklist.md) and [release-readiness.md](./deployment/release-readiness.md).

## Execution Principles

Baseline standards for each route (met for shipped phases; revisit when adding new pages):

- [x] Real API/data wiring complete (no placeholder or hardcoded demo state in production)
- [x] Loading, empty, error, and success states implemented on live routes
- [x] Primary user actions work end-to-end for shipped modules
- [ ] Basic analytics instrumentation added (GA4/Plausible — configure per environment)
- [x] Accessibility baseline on marketing and core app flows (ongoing audits on new UI)
- [x] Route-level QA test coverage exists (Playwright + route validators in CI)

## Phase 1 (Weeks 1-2): Auth and Platform Stabilization

- [x] Validate full auth callback path (`/app/login` -> Keycloak -> `/auth/callback` -> `/app/dashboard`) — verified locally; confirm on each deploy host via [staging-deploy-checklist.md](./deployment/staging-deploy-checklist.md)
- [x] Enforce protected route access checks across `/app/*`
- [x] Add auth error observability (redirect failures, callback failures, session expiry) — `lib/auth-errors.ts`, `sessionStorage` + console in dev
- [x] Confirm environment parity (local, preview, production) for Keycloak settings — templates + `npm run validate:env:parity` (Keycloak console URIs still manual; see [keycloak.md](./deployment/keycloak.md))
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

## Phase 3 (Weeks 4-8): Candidate App Pages Full Completion — done (M2 candidate routes)

Routes: `/app/dashboard`, `/app/resume`, `/app/jobs`, `/app/auto-apply`, `/app/interview`, `/app/tracker`, `/app/negotiation`, `/app/legal`, `/app/coding-arena`, `/app/credits`, `/app/profile`, `/app/settings`

- [x] Gate mock-only routes with `FeatureUnavailable` when API is not live (`lib/candidate-features.ts`)
- [x] Centralized React Query keys + cross-page invalidation on job apply (`lib/query-keys.ts`)
- [x] Unified loading/empty/error states on live API pages (dashboard, jobs, tracker, profile, settings, credits)
- [x] Real credits + profile stats from backend (`user_credits`, apply deducts 5 credits)
- [x] Resume score overview + role optimization via live `/resume` API
- [x] Resume advanced tabs (templates, builder, analysis, versions) via live `/resume/*` APIs
- [x] `/app/coding-arena` — challenge catalog, Python sandbox execution, and solution submission
- [x] Legal document file storage (multipart upload, download, content-aware validation)
- [x] Interview feedback — OpenRouter LLM when `LLM_API_KEY` is set; heuristic STAR/keyword rubric fallback
- [x] Replace remaining placeholder blocks (interview, negotiation, legal, auto-apply)
- [x] Implement core user actions per page for live modules (apply, optimize, validate, profile CRUD)
- [x] Ensure cross-page navigation and data consistency for live APIs
- [x] Add route-level integration tests for core journeys (`e2e/candidate-routes.spec.ts`)
- [x] Candidate route map validation in CI (`npm run validate:candidate`)
- [x] Interview, negotiation, legal, and auto-apply live APIs (`/interview`, `/negotiation`, `/legal`, `/auto-apply`)

**Phase 3 polish — done:**

- [x] Legal file storage on Cloudflare R2 (S3-compatible; local `UPLOAD_DIR` fallback for dev)
- [x] Coding arena code execution and solution submission (`POST /coding/challenges/{id}/submit`)
- [x] Interview LLM feedback (OpenRouter; heuristics when key unset)

## Phase 4 (Weeks 8-10): Admin App Pages Completion — done (M3 admin routes)

Routes: `/app/admin/dashboard`, `/app/admin/jobs`, `/app/admin/publish`, `/app/admin/applications`, `/app/admin/candidates`, `/app/admin/analytics`, `/app/admin/plans`, `/app/admin/settings`

- [x] Implement role-based access controls and route guards (`RealmRoleRoute` + admin layout)
- [x] Wire admin tables, filters, and action flows to real APIs
- [x] Centralized admin React Query keys + cross-page invalidation (`lib/admin-query-keys.ts`)
- [x] Unified loading/empty/error states on dashboard, analytics, and plans
- [x] Audit-safe action handling (confirm modals before close job, suspend, offer/reject)
- [x] Publish job success uses toast + invalidates admin stats/jobs
- [x] Admin route map validation in CI (`npm run validate:admin`)
- [x] Route-level integration tests (`e2e/admin-routes.spec.ts`)

## Phase 5 (Weeks 10-11): Billing and Monetization — done

- [x] Pricing plans source-of-truth integration (`GET /billing/plans`; marketing `/pricing` + `/app/credits`)
- [x] Checkout/session creation and redirect flow (Razorpay orders + mock dev fallback)
- [x] Subscription lifecycle (upgrade/downgrade/cancel) in UI + APIs
- [x] Billing history and invoice visibility
- [x] Payment failure/retry UX and support-safe messaging

## Phase 6 (Weeks 11-12): Quality Gate and Release Readiness — done

- [x] Expand E2E coverage for top user funnels (`e2e/funnels.spec.ts`)
- [x] Add CI gates for lint, typecheck, tests, and build (`validate:release`, `backend-ci` job)
- [x] Integrate monitoring (errors + performance) and alerting — see [observability.md](./development/observability.md)
- [x] Complete security and privacy checklist baseline ([security-privacy-checklist.md](./development/security-privacy-checklist.md))
- [x] Final documentation pass — [release-readiness.md](./deployment/release-readiness.md), architecture, runbooks

## Milestone Targets

- **M1:** Auth/platform stable + marketing pages production-ready
- **M2:** Candidate `/app/*` pages functionally complete — done
- **M3:** Admin and billing complete — done
- **M4:** Release-quality hardening complete — done

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

- [x] No duplicate auth surfaces in code or docs
- [x] All page routes have real data + complete state handling
- [x] Critical funnels are covered by automated tests
- [x] Production monitoring is active and actionable (Sentry + metrics docs; enable DSNs in prod)
- [x] Documentation matches implemented behavior

## Post-M4 — optional enhancements

Not required for M4 release; track if product scope expands:

- [ ] More coding-arena challenges with executable test harnesses (only Two Sum today)
- [ ] Transactional email (contact form, notifications)
- [ ] Per-page analytics events beyond global shell instrumentation
