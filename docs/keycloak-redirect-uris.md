# Keycloak redirect URIs (Hiring Journey)

Configure the **OpenID Connect** client in Keycloak (Realm → Clients → your client). Values below use `hiringjourney.com`; substitute your production domain and every **Netlify deploy preview** host you use for OIDC.

## Valid redirect URIs

Used as `redirect_uri` after login (marketing flow uses `/auth/callback`; product app uses the current page, e.g. `/app/login`).

- `https://hiringjourney.com/auth/callback`
- `https://hiringjourney.com/app/login`
- `http://localhost:3000/auth/callback`
- `http://localhost:3000/app/login`

Add preview URLs as needed, for example:

- `https://deploy-preview-123--your-site.netlify.app/auth/callback`
- `https://deploy-preview-123--your-site.netlify.app/app/login`

## Web origins

- `https://hiringjourney.com`
- `http://localhost:3000`
- Plus each preview origin you enabled above.

## Valid post logout redirect URIs

Must match what you pass to `keycloak.logout({ redirectUri })` — this codebase uses **`NEXT_PUBLIC_APP_URL`** (and optionally `NEXT_PUBLIC_AUTH_URL` as fallback).

- `https://hiringjourney.com`
- `https://hiringjourney.com/app/login`
- `http://localhost:3000`
- `http://localhost:3000/app/login`

## Silent check SSO

The file `public/silent-check-sso.html` is loaded in a hidden iframe. Allow its **full URL** if Keycloak validates redirect URIs strictly:

- `https://hiringjourney.com/silent-check-sso.html`
- `http://localhost:3000/silent-check-sso.html`

Optional override: `NEXT_PUBLIC_KEYCLOAK_SILENT_CHECK_SSO_URI`.
