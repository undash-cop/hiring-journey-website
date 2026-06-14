# Pricing to Signup Flow

## Current Product Decision

Pricing remains on the marketing site, and account creation/sign-in are handled by Keycloak redirects.

## Flow Diagram

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Pricing Page   │         │  App Signup     │         │    Keycloak     │
│  /pricing       │  ────>  │  /app/signup    │  ────>  │  Register/Login │
│                 │  Link    │                 │ Redirect │                 │
│  User clicks    │         │  Starts         │         │  Handles auth   │
│  "Get Started"  │         │  redirectToRegister()      │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## Implementation Details

### 1. Pricing Page (`components/pricing/pricing-plans.tsx`)

- CTA buttons navigate to `/app/signup`.
- Plan selection analytics is tracked before navigation.

### 2. Signup Route (`app/app/signup/page.tsx`)

- Route is a minimal client redirect handler.
- It immediately calls `redirectToRegister()` from `lib/keycloak.ts`.
- No local signup form is rendered.

### 3. Login/Forgot Password Routes

- `/app/login` calls `redirectToLogin()`.
- `/app/forgot-password` currently also calls `redirectToLogin()` (Keycloak-owned recovery flow).

## What Changed from Legacy

- Removed local marketing auth form pages/components.
- Removed dependency on `/api/auth/signup` for signup initiation in this repo.
- Standardized auth ownership under Keycloak.

## Validation Checklist

- [x] Clicking plan CTA opens `/app/signup`.
- [x] `/app/signup` immediately redirects to Keycloak registration.
- [x] `/app/login` immediately redirects to Keycloak login.
- [x] Successful callback lands users at `/app/dashboard`.
- [x] Marketing CTAs validated in CI (`npm run validate:marketing`).
