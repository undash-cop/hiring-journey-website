# Architecture Decision: Pricing & Signup Pages

## Decision: Keep Pricing & Signup in Marketing App

**Status:** ✅ Implemented  
**Date:** February 2026

## Overview

Pricing and Signup pages remain on the marketing website (`hiringjourney.com`) and communicate with the app subdomain (`app.hiringjourney.com`) via API calls. Only the login page can optionally redirect to the app subdomain.

## Architecture

```
┌─────────────────────────────────┐         ┌─────────────────────────┐
│   Marketing Website             │         │   App Subdomain          │
│   hiringjourney.com            │  ────>  │  app.hiringjourney.com  │
│                                 │  API    │                          │
│  ✅ Pricing Page                │  Calls  │  - API Endpoints        │
│  ✅ Signup Page                  │         │  - Authentication       │
│  ✅ Login Page (optional redirect)│        │  - Dashboard            │
│  ✅ Features, Blog, About        │         │  - User Features        │
└─────────────────────────────────┘         └─────────────────────────┘
```

## Why This Approach?

### ✅ Advantages

1. **SEO Benefits**
   - Pricing page stays on main domain (better SEO ranking)
   - Users can find pricing via search engines
   - No redirects = better crawlability

2. **Better User Experience**
   - Users see pricing without leaving marketing site
   - Smoother conversion funnel
   - No context switching

3. **Marketing Control**
   - Marketing team can update pricing page easily
   - A/B testing easier on marketing domain
   - Better analytics tracking

4. **Conversion Optimization**
   - Pricing visible before signup
   - Can show testimonials, trust badges on same page
   - Better conversion rates

5. **Flexibility**
   - Can show different pricing to different users
   - Easier to run promotions
   - Better for content marketing

### ⚠️ Considerations

1. **CORS Configuration**
   - App subdomain must allow CORS from marketing domain
   - Need proper CORS headers on API endpoints

2. **API Security**
   - API endpoints must be properly secured
   - Rate limiting needed
   - CSRF protection for forms

3. **Session Management**
   - Cookies may need to be shared across subdomains
   - Or use token-based auth

## Implementation

### API Communication

The marketing site uses `lib/app-api.ts` to communicate with the app subdomain:

```typescript
// Signup
await signupUser({ name, email, password, inviteCode });

// Login
await loginUser({ email, password });

// Verify Invite Code
await verifyInviteCode(code);

// Get Pricing Plans (optional - can be static)
await getPricingPlans();

// Create Checkout Session
await createCheckoutSession({ planId, billingCycle });
```

### Flow

1. **User visits `/pricing`** → Marketing site (SEO friendly)
2. **User clicks "Get Started"** → Stays on marketing site, goes to `/auth/signup`
3. **User fills signup form** → Form submits to app subdomain API
4. **After signup** → Redirects to `app.hiringjourney.com/dashboard`

### CORS Setup (Required in App Subdomain)

The app subdomain needs to allow CORS from the marketing domain:

```typescript
// In app subdomain API routes
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    "https://hiringjourney.com",
    "http://localhost:3000", // For development
  ];

  const headers = new Headers();
  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  // Handle OPTIONS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers, status: 204 });
  }

  // Your API logic here...
}
```

## Alternative Approaches Considered

### Option 1: Redirect Everything (Rejected)
- ❌ Poor SEO for pricing page
- ❌ Users leave marketing site
- ❌ Worse conversion rates

### Option 2: Keep Everything in Marketing App (Current)
- ✅ Best SEO
- ✅ Better UX
- ✅ More flexible
- ⚠️ Requires CORS setup

### Option 3: Hybrid (Current Implementation)
- ✅ Pricing & Signup in marketing (SEO + UX)
- ✅ Login can redirect (optional)
- ✅ Dashboard in app (clean separation)
- ✅ Best of both worlds

## API Endpoints Needed in App Subdomain

The app subdomain needs these API endpoints:

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/verify-invite
GET  /api/pricing/plans (optional)
POST /api/pricing/checkout
```

## Environment Variables

### Marketing Site (.env.local)
```env
# App subdomain URL for API calls
NEXT_PUBLIC_APP_SUBDOMAIN_URL=https://app.hiringjourney.com

# Optional: Redirect login to app subdomain
NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP=false
```

### App Subdomain (.env.local)
```env
# Marketing site URL (for CORS)
NEXT_PUBLIC_MARKETING_URL=https://hiringjourney.com

# App URL
NEXT_PUBLIC_APP_URL=https://app.hiringjourney.com
```

## Migration Path

1. ✅ Keep pricing and signup pages in marketing site
2. ✅ Create API client (`lib/app-api.ts`)
3. ✅ Update forms to call app subdomain APIs
4. ⏳ Set up CORS in app subdomain
5. ⏳ Implement API endpoints in app subdomain
6. ⏳ Test end-to-end flow

## Testing

### Local Development

1. **Marketing Site:** `http://localhost:3000`
2. **App Subdomain:** `http://localhost:3001`
3. **Set in marketing `.env.local`:**
   ```env
   NEXT_PUBLIC_APP_SUBDOMAIN_URL=http://localhost:3001
   ```

### Test Scenarios

- [ ] Signup form submits to app API
- [ ] Login form submits to app API
- [ ] Pricing page loads on marketing site
- [ ] After signup, redirects to app dashboard
- [ ] CORS headers work correctly
- [ ] Error handling works

## Conclusion

Keeping pricing and signup in the marketing app with API calls to the app subdomain provides the best balance of SEO, UX, and technical architecture. This is the recommended approach for SaaS products.
