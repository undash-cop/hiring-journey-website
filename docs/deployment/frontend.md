# Frontend deployment (Netlify)

Deploy the Next.js app to Netlify. The API is deployed separately — see [backend.md](./backend.md).

## Prerequisites

- GitHub repo connected to Netlify
- Node.js 22+ (set in `netlify.toml`)
- Environment variables from `.env.example`

## Build settings

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Plugin | `@netlify/plugin-nextjs` |
| Node version | `22` |

Do **not** set `publish = ".next"` — the Netlify Next.js plugin manages output.

## Required environment variables

```env
NEXT_PUBLIC_APP_URL=https://hiringjourney.com
NEXT_PUBLIC_API_URL=https://api.hiringjourney.com
NEXT_PUBLIC_KEYCLOAK_URL=
NEXT_PUBLIC_KEYCLOAK_REALM=hiringjourney
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=hiringjourney-app
```

Set the same `NEXT_PUBLIC_*` vars per Netlify context (production, staging, deploy previews). Use different values when Keycloak redirect URIs are origin-specific.

Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — see [analytics.md](../development/analytics.md).

## CORS

The browser calls `NEXT_PUBLIC_API_URL` directly. Ensure backend `CORS_ORIGINS` includes your Netlify/production domain.

## Keycloak

Add redirect URIs and web origins for each deployed host. See [keycloak.md](./keycloak.md).

## Middleware

`proxy.ts` redirects legacy `/auth/login` → `/app/login` on Netlify's Next runtime.

## Deploy methods

### Netlify UI (first time)

1. Netlify → Add site → Import from Git
2. Verify build command and Node 22
3. Add environment variables
4. Deploy

### Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set NEXT_PUBLIC_APP_URL https://your-site.netlify.app
netlify deploy --prod
```

## Custom domain

1. Site settings → Domain management → Add custom domain
2. Point DNS CNAME to Netlify (or use Netlify DNS)
3. SSL is provisioned automatically

## Continuous deployment

- Push to `main` → production deploy
- Pull requests → deploy previews (add preview URLs to Keycloak)

## Post-deploy checks

- [ ] `/`, `/pricing`, `/features` load over HTTPS
- [ ] `/sitemap.xml` and `/robots.txt` accessible
- [ ] `/app/login` → Keycloak → `/app/dashboard`
- [ ] Mobile layout OK

## Troubleshooting

- **Build fails:** Check Node 22, env vars, and deploy logs
- **Stale site:** Trigger "Clear cache and deploy"
- **Dev issues:** [troubleshooting.md](../development/troubleshooting.md)

## Related

- [production-checklist.md](./production-checklist.md) — M1 release
- [staging.md](./staging.md) — staging environment
- [operations/runbook.md](../operations/runbook.md) — rollback
