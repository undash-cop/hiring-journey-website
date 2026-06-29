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

## Backend (separate repo — not deployed on Netlify)

The API lives in [hiring-journey-backend](https://github.com/undash-cop/hiring-journey-backend) and runs on your VM. This frontend repo does **not** include backend code for Netlify builds.

If your site still has a `backend/` git submodule in the repo, Netlify will try to clone it **before** the build. A **private** backend repo causes deploy failure unless you add Netlify’s deploy key to that backend repo (Site configuration → Build & deploy → Deploy key).

**Recommended:** remove the submodule from this repo (see `scripts/clone-backend-dev.sh` for local API checkout).

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

### Netlify continuous deployment (recommended)

1. Netlify → Add site → Import from Git → `undash-cop/hiring-journey-website`
2. Build command: `npm run build` (from `netlify.toml`)
3. Node version: `22`
4. Add environment variables (see above)
5. Push to `main` → Netlify deploys automatically

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

- Push to `main` → Netlify production deploy
- Pull requests → Netlify deploy previews (add preview URLs to Keycloak)

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
