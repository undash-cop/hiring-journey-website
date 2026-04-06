# Netlify (Next.js)

- **Build**: `npm run build` with **Node 22** (`netlify.toml` → `[build.environment]`).
- **Plugin**: `@netlify/plugin-nextjs` — it controls output; do **not** set `publish = ".next"` (removed from this repo’s `netlify.toml`).
- **Middleware**: `proxy.ts` runs on Netlify’s Next runtime for `/auth/login` (optional redirect to app login).
- **Env**: Set the same `NEXT_PUBLIC_*` vars in Netlify **Site settings → Environment variables**. Use different values for **Deploy previews** if Keycloak redirect URIs are origin-specific.
- **API proxy**: `netlify.toml` includes `[[redirects]]` from `/api/backend/*` to your API; adjust host as needed.

See `docs/keycloak-redirect-uris.md` for preview URLs in Keycloak.
