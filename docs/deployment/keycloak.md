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

Must match what you pass to `keycloak.logout({ redirectUri })` — the app uses the marketing home URL (`NEXT_PUBLIC_APP_URL` + `/`, e.g. `https://hiringjourney.com/`).

### Production

- `https://hiringjourney.com`
- `https://hiringjourney.com/`

### Staging

- `https://staging.hiringjourney.com`
- `https://staging.hiringjourney.com/`

### Local development

- `http://localhost:3000`
- `http://localhost:3000/`
- `http://localhost:3001`
- `http://localhost:3001/`

## Silent check SSO

The file `public/silent-check-sso.html` is loaded in a hidden iframe. Allow its **full URL** if Keycloak validates redirect URIs strictly:

- `https://hiringjourney.com/silent-check-sso.html`
- `https://staging.hiringjourney.com/silent-check-sso.html`
- `http://localhost:3000/silent-check-sso.html`
- `http://localhost:3001/silent-check-sso.html`

Optional override: `NEXT_PUBLIC_KEYCLOAK_SILENT_CHECK_SSO_URI`.

## Google sign-in (optional)

The app can show **Continue with Google** on `/app/login` and `/app/signup` when enabled.

### Keycloak (realm admin)

1. **Identity providers** → **Add provider** → **Google**.
2. Set **Alias** to `google` (or match `NEXT_PUBLIC_KEYCLOAK_GOOGLE_IDP_ALIAS`).
3. Add Google Cloud OAuth client ID/secret (authorized redirect URI: Keycloak broker endpoint).
4. Enable the provider and save.

### Netlify / frontend env

```env
NEXT_PUBLIC_FEATURE_GOOGLE_OAUTH=true
NEXT_PUBLIC_KEYCLOAK_GOOGLE_IDP_ALIAS=google
```

When `NEXT_PUBLIC_FEATURE_GOOGLE_OAUTH` is unset or `false`, `/app/login` and `/app/signup` redirect straight to Keycloak (email/password) as before.

Google auth uses Keycloak `idpHint` — no extra redirect URIs beyond the existing `/auth/callback` entries.
