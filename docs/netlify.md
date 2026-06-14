# Netlify (Next.js)

- **Build**: `npm run build` with **Node 22** (`netlify.toml` → `[build.environment]`).
- **Plugin**: `@netlify/plugin-nextjs` — it controls output; do **not** set `publish = ".next"` (removed from this repo’s `netlify.toml`).
- **Middleware**: `proxy.ts` runs on Netlify’s Next runtime to redirect legacy `/auth/login` to `/app/login`.
- **Env**: Set the same `NEXT_PUBLIC_*` vars in Netlify **Site settings → Environment variables**. Use different values for **Deploy previews** if Keycloak redirect URIs are origin-specific.
- **API**: Browser calls `NEXT_PUBLIC_API_URL` directly (e.g. `https://api.hiringjourney.com`). Ensure backend `CORS_ORIGINS` includes your Netlify/production domain.

See `docs/keycloak-redirect-uris.md` for preview URLs in Keycloak.
