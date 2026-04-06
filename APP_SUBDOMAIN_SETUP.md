# App Subdomain Setup Guide

> **Note:** The product UI is now part of this monorepo (`/app/*` routes, `components/app/`). Older steps that mention a separate `hiring-journey-app` folder refer to the pre-merge layout; use the same deployment or a second Next deploy for `app.` as needed.

This guide explains how to set up a separate webapp at `https://app.hiringjourney.com` that works with the marketing website.

## Architecture Overview

```
┌─────────────────────────┐         ┌─────────────────────────┐
│  Marketing Website      │         │   Webapp Application     │
│  hiringjourney.com      │  ────>  │  app.hiringjourney.com   │
│                         │  API    │                          │
│  ✅ Pricing Page        │  Calls  │  - API Endpoints         │
│  ✅ Signup Page          │         │  - Authentication        │
│  ✅ Login Page           │         │  - Dashboard             │
│  ✅ Features, Blog       │         │  - User Features         │
│  ✅ About                │         │                          │
└─────────────────────────┘         └─────────────────────────┘
```

## Approach: Hybrid Architecture (Recommended)

**Pricing and Signup pages stay on the marketing website** for SEO benefits, but they communicate with the app subdomain via API calls. This provides the best balance of SEO, UX, and technical architecture.

### Why This Approach?

✅ **Better SEO** - Pricing page stays on main domain  
✅ **Better UX** - Users don't leave marketing site  
✅ **Better Conversion** - Smoother funnel  
✅ **Flexibility** - Marketing team controls pricing page

## Step 1: Create the Webapp Project

```bash
# Create new Next.js app for the webapp
npx create-next-app@latest hiring-journey-app --typescript --tailwind --app

cd hiring-journey-app

# Install dependencies
npm install
```

## Step 2: Set Up Environment Variables

### Marketing Website (`.env.local`)
```env
# Marketing site URL
NEXT_PUBLIC_APP_URL=https://hiringjourney.com

# Optional: Redirect auth pages to app subdomain
# App subdomain URL (for reference)
NEXT_PUBLIC_APP_SUBDOMAIN_URL=https://app.hiringjourney.com
```

### Webapp (`.env.local`)
```env
# Webapp URL
NEXT_PUBLIC_APP_URL=https://app.hiringjourney.com

# Marketing site URL (for redirects back)
NEXT_PUBLIC_MARKETING_URL=https://hiringjourney.com

# Backend API URL
NEXT_PUBLIC_API_URL=https://api.hiringjourney.com
```

## Step 3: Configure DNS

Add DNS records for the subdomain:

```
Type: CNAME
Name: app
Value: your-hosting-provider.com (or A record with IP)
TTL: 3600
```

## Step 4: API Integration (Marketing Site)

The marketing site communicates with the app subdomain via API calls. Forms submit data to the app subdomain APIs.

### How It Works

1. **Pricing Page** (`/pricing`) - Stays on marketing site, displays pricing
2. **Signup Page** (`/auth/signup`) - Stays on marketing site, submits to app API
3. **Login Page** (`/auth/login`) - Can optionally redirect to app subdomain
4. **After Signup/Login** - Users are redirected to `app.hiringjourney.com/dashboard`

### API Client

The marketing site uses `lib/app-api.ts` to communicate with the app subdomain:

```typescript
import { signupUser, loginUser, requestPasswordReset } from "@/lib/app-api";

// Signup
await signupUser({ name, email, password, inviteCode });

// Login
await loginUser({ email, password });

// Forgot Password
await requestPasswordReset({ email });
```

### Optional: Redirect Login Only

If you want to redirect only the login page to the app subdomain:

Set in `.env.local`:
```env
NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP=true
NEXT_PUBLIC_APP_SUBDOMAIN_URL=https://app.hiringjourney.com
```

This will redirect:
- `/auth/login` → `https://app.hiringjourney.com/login`

**Note:** Pricing and Signup stay on marketing site by default for SEO benefits.

## Step 5: Create Webapp Pages & API Endpoints

In your new webapp project, create:

### Pages (if login redirects enabled)
```
app/
├── login/
│   └── page.tsx          # Login page (if redirecting)
├── dashboard/
│   └── page.tsx          # Main dashboard
└── layout.tsx            # Root layout
```

### API Endpoints (Required)
```
app/api/
├── auth/
│   ├── signup/
│   │   └── route.ts      # POST /api/auth/signup
│   ├── login/
│   │   └── route.ts      # POST /api/auth/login
│   ├── forgot-password/
│   │   └── route.ts      # POST /api/auth/forgot-password
│   └── verify-invite/
│       └── route.ts      # POST /api/auth/verify-invite
└── pricing/
    ├── plans/
    │   └── route.ts      # GET /api/pricing/plans (optional)
    └── checkout/
        └── route.ts      # POST /api/pricing/checkout
```

## Step 6: Set Up CORS in App Subdomain

**CRITICAL:** The app subdomain must allow CORS requests from the marketing domain.

### Example CORS Setup (App Subdomain API Routes)

```typescript
// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://hiringjourney.com",
  "http://localhost:3000", // For development
];

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  
  const headers = new Headers();
  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  // Handle OPTIONS preflight
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { headers, status: 204 });
  }

  // Your signup logic here...
  const data = await request.json();
  
  // Process signup...
  
  return NextResponse.json(
    { success: true, message: "Account created successfully" },
    { headers }
  );
}
```

### Copy Components (Only if Login Redirects Enabled)

If you enable login redirect, you can copy:
- `components/auth/login-form.tsx`
- `lib/utils.ts`
- `lib/analytics.ts`

## Step 7: Deploy Both Applications

### Marketing Website (Netlify/Vercel)
1. Connect repository: `hiring-journey-website`
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Domain: `hiringjourney.com`
5. Environment variables: Set as per Step 2

### Webapp (Vercel/Netlify)
1. Connect repository: `hiring-journey-app`
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Domain: `app.hiringjourney.com`
5. Environment variables: Set as per Step 2

## Benefits of This Approach

1. **No Changes Required**: Marketing website remains unchanged
2. **Independent Deployments**: Deploy marketing and app separately
3. **Independent Scaling**: Scale each app based on its needs
4. **Clear Separation**: Marketing vs. application logic
5. **Flexible**: Can enable/disable redirects via environment variables
6. **SEO**: Marketing site stays focused on content

## Optional: Manual Redirects

If you prefer manual redirects instead of middleware, you can update specific components:

### Example: Redirect Login Button

```typescript
// In any component
const handleLogin = () => {
  window.location.href = "https://app.hiringjourney.com/login";
};
```

### Example: Redirect Pricing Link

```typescript
// In any component
<a href="https://app.hiringjourney.com/pricing">
  View Pricing
</a>
```

## Testing

### Local Development

1. **Marketing Site:**
   ```bash
   cd hiring-journey-website
   npm run dev
   # Runs on http://localhost:3000
   ```

2. **Webapp:**
   ```bash
   cd hiring-journey-app
   npm run dev -p 3001
   # Runs on http://localhost:3001
   ```

3. **Test Redirects (if enabled):**
   - Visit `http://localhost:3000/auth/login`
   - Should redirect to `http://localhost:3001/login` (if redirect enabled)

### Production Testing

1. Verify marketing site works normally
2. Verify app subdomain loads correctly
3. Test redirects (if enabled)
4. Test direct access to app subdomain
5. Verify authentication flow

## Migration Checklist

- [ ] Create webapp Next.js project
- [ ] Set up DNS for app subdomain
- [ ] Configure environment variables
- [ ] Copy necessary components to webapp
- [ ] Create webapp pages (login, signup, pricing, dashboard)
- [ ] Deploy webapp to hosting provider
- [ ] Test app subdomain independently
- [ ] (Optional) Enable redirects in marketing site
- [ ] Test redirects work correctly
- [ ] Set up monitoring and analytics

## Current State

✅ **Marketing Website**: Unchanged, works as-is
✅ **App Config**: Available in `lib/app-config.ts` for reference
✅ **Middleware**: Available but disabled by default
✅ **Components**: All components remain unchanged

## Next Steps

1. Create the webapp project
2. Set up authentication backend
3. Configure deployment pipelines
4. Test both applications independently
5. (Optional) Enable redirects when ready

## Support

For questions or issues:
- Next.js documentation: https://nextjs.org/docs
- Deployment guides: See `DEPLOYMENT.md`
- Environment variables: See `.env.example`
