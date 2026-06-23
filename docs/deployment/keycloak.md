# Keycloak redirect URIs (Hiring Journey)

Configure the **OpenID Connect** client in Keycloak (Realm → Clients → your client). Add every host where the app runs: production, staging, local dev, and Netlify deploy previews.

## Valid redirect URIs

Used as `redirect_uri` after login (marketing flow uses `/auth/callback`; product app uses the current page, e.g. `/app/login`).

### Production

- `https://hiringjourney.com/auth/callback`
- `https://hiringjourney.com/app/login`

### Staging

- `https://staging.hiringjourney.com/auth/callback`
- `https://staging.hiringjourney.com/app/login`

### Local development

- `http://localhost:3000/auth/callback`
- `http://localhost:3000/app/login`
- `http://localhost:3001/auth/callback` (when Next.js binds to 3001)
- `http://localhost:3001/app/login`

### Netlify deploy previews

Add each preview host you use, for example:

- `https://deploy-preview-123--your-site.netlify.app/auth/callback`
- `https://deploy-preview-123--your-site.netlify.app/app/login`

Run `npm run validate:env:parity` before deploy to confirm frontend/backend staging templates agree on realm and client id.

## Web origins

- `https://hiringjourney.com`
- `https://staging.hiringjourney.com`
- `http://localhost:3000`
- `http://localhost:3001`
- Plus each preview origin you enabled above.

## Valid post logout redirect URIs

Must match what you pass to `keycloak.logout({ redirectUri })` — this codebase uses **`NEXT_PUBLIC_APP_URL`** (and optionally `NEXT_PUBLIC_AUTH_URL` as fallback).

### Production

- `https://hiringjourney.com`
- `https://hiringjourney.com/app/login`

### Staging

- `https://staging.hiringjourney.com`
- `https://staging.hiringjourney.com/app/login`

### Local development

- `http://localhost:3000`
- `http://localhost:3000/app/login`
- `http://localhost:3001`
- `http://localhost:3001/app/login`

## Silent check SSO

The file `public/silent-check-sso.html` is loaded in a hidden iframe. Allow its **full URL** if Keycloak validates redirect URIs strictly:

- `https://hiringjourney.com/silent-check-sso.html`
- `https://staging.hiringjourney.com/silent-check-sso.html`
- `http://localhost:3000/silent-check-sso.html`
- `http://localhost:3001/silent-check-sso.html`

Optional override: `NEXT_PUBLIC_KEYCLOAK_SILENT_CHECK_SSO_URI`.
