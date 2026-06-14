# Vite -> Next App Router Migration Report

## 1) Route Mapping Table (React -> Next)

| React Route | Next Route |
|---|---|
| `/` | `/app` |
| `/about` | `/app/about` |
| `/login` | `/app/login` |
| `/signup` | `/app/signup` |
| `/forgot-password` | `/app/forgot-password` |
| `/dashboard` | `/app/dashboard` |
| `/resume` | `/app/resume` |
| `/jobs` | `/app/jobs` |
| `/auto-apply` | `/app/auto-apply` |
| `/interview` | `/app/interview` |
| `/tracker` | `/app/tracker` |
| `/negotiation` | `/app/negotiation` |
| `/legal` | `/app/legal` |
| `/coding-arena` | `/app/coding-arena` |
| `/credits` | `/app/credits` |
| `/profile` | `/app/profile` |
| `/settings` | `/app/settings` |
| `/admin` | `/app/admin` (redirects to `/app/admin/dashboard`) |
| `/admin/dashboard` | `/app/admin/dashboard` |
| `/admin/jobs` | `/app/admin/jobs` |
| `/admin/publish` | `/app/admin/publish` |
| `/admin/applications` | `/app/admin/applications` |
| `/admin/candidates` | `/app/admin/candidates` |
| `/admin/analytics` | `/app/admin/analytics` |
| `/admin/plans` | `/app/admin/plans` |
| `/admin/settings` | `/app/admin/settings` |
| `*` | `/app/[...path]` (auth-aware redirect fallback) |

## 2) Target Folder Structure

```txt
app/app/
  layout.tsx
  app.css
  page.tsx
  about/page.tsx
  login/page.tsx
  signup/page.tsx
  forgot-password/page.tsx
  not-found.tsx
  404.tsx
  [...path]/page.tsx
  (candidate)/
    layout.tsx
    [section]/
      page.tsx
      loading.tsx
      error.tsx
  (admin)/
    admin/
      layout.tsx
      page.tsx
      [section]/page.tsx

components/app/
  app-shell-providers.tsx
  shell/
    query-client-providers.tsx
    route-parity.ts
  features/ … layouts/ … components/ … context/ … contexts/ …
  lib/ … services/ … store/ … types/ … utils/ …
```

## 3) Migrated Layout

- Candidate shell migrated via `components/app/layouts/CandidateLayout.tsx`
- Admin shell migrated via `components/app/layouts/AdminLayout.tsx`
- Next segment wrappers:
  - `app/app/(candidate)/layout.tsx`
  - `app/app/(admin)/admin/layout.tsx`

## 4) Middleware / Proxy Update

- `proxy.ts` matcher: `"/auth/login"` only (legacy redirect to `/app/login`).
- `/app/*` authentication is client-side (Keycloak-js + `components/app`).

## 5) API Client

- API access: `components/app/services/api.ts` → OpenAPI client in `lib/generated/api-client/`
- Includes:
  - auth header attach
  - `credentials: "include"`
  - refresh-token retry (`/auth/refresh`)
  - typed method wrappers (`get/post/put/patch/delete`)

## 6) Dynamic Route Example

- Candidate dynamic segment:
  - `app/app/(candidate)/[section]/page.tsx`
- Admin dynamic segment:
  - `app/app/(admin)/admin/[section]/page.tsx`

## 7) Loading Example

- `app/app/(candidate)/[section]/loading.tsx`

## 8) Error Example

- `app/app/(candidate)/[section]/error.tsx`

## 9) Migration Checklist

- [x] All React Router routes mapped to `/app/*`
- [x] Nested route groups migrated (candidate/admin)
- [x] Layout wrappers migrated (sidebar + breadcrumbs)
- [x] Guarded route behavior moved to proxy guard
- [x] Catch-all handling migrated
- [x] API integration code migrated and available
- [x] Keycloak env usage converted to `NEXT_PUBLIC_*`
- [x] Shared components/hooks/utils/styles integrated
- [x] `silent-check-sso.html` moved to Next public assets
- [x] Marketing site routes unchanged
- [x] Build passes (`npm run build`)

## 10) Import Conversion Examples

### Router links/navigation

- `react-router` `Link` -> `next/link`
- `useNavigate()` -> `useRouter().push(...)`
- `useLocation()` -> `usePathname()`
- `Outlet` layout pattern -> Next layout `children`

### Path normalization

- App shell imports now use direct project aliases:
  - `@/components/app/...`
  - `@/components/app/...`
