# Architecture Decision: Single Web App on `/app`

## Status

Accepted and implemented (April 2026).

## Decision

Use one web application on `https://hiringjourney.com` with product routes under `https://hiringjourney.com/app`.

We are not using a separate `https://app.hiringjourney.com` deployment anymore.

## Why

1. Simpler deployment and operations.
2. No cross-subdomain auth/session complexity.
3. Less documentation and environment drift.
4. Faster development and debugging.

## Auth Model

- Keycloak remains the identity provider.
- Auth entry routes are redirect-only:
  - `/app/login` -> `redirectToLogin()`
  - `/app/signup` -> `redirectToRegister()`
  - `/app/forgot-password` -> `redirectToLogin()` (Keycloak-owned recovery flow)
- `/auth/login` is retained only as legacy compatibility and redirects to `/app/login`.

## Routing Ownership

- Marketing pages stay on root routes (`/`, `/pricing`, `/about`, etc.).
- Product pages stay under `/app/*`.
- Callback route remains `/auth/callback`.

## Non-Goals

- No split-host login toggles.
- No app-subdomain routing docs.
- No local form-based auth stack in this repo.

## Validation Checklist

- [ ] `/auth/login` redirects to `/app/login`.
- [ ] `/app/login` starts Keycloak login.
- [ ] `/app/signup` starts Keycloak registration.
- [ ] Successful callback lands on `/app/dashboard`.
