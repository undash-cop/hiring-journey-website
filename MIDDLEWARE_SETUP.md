# Middleware Setup Guide

## Overview

The middleware is configured at the root level (`middleware.ts`). It provides **optional** redirects from the marketing website to the app subdomain.

**Important:** By default, redirects are **disabled**. Pricing and Signup pages stay on the marketing site for SEO benefits. Only the login page can optionally redirect to the app subdomain.

## How It Works

The middleware intercepts requests to:
- `/auth/login` route (optional redirect only)

**Note:** Pricing and Signup pages remain on the marketing site and communicate with the app subdomain via API calls (see `APP_SUBDOMAIN_SETUP.md`).

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```env
# App subdomain URL (required if enabling redirects)
NEXT_PUBLIC_APP_SUBDOMAIN_URL=https://app.hiringjourney.com
```

### Route Mappings

When redirects are enabled:

| Marketing Site Route | App Subdomain Route |
|---------------------|---------------------|
| `/auth/login` | `/login` |

**Note:** Signup and Pricing pages stay on the marketing site (`/auth/signup`, `/pricing`) and communicate with the app subdomain via API calls.

## Testing

### Test Locally

1. **Start the marketing site:**
   ```bash
   npm run dev
   # Runs on http://localhost:3000
   ```

2. **Start the app subdomain (in a separate terminal):**
   ```bash
   cd ../hiring-journey-app
   npm run dev -p 3001
   # Runs on http://localhost:3001
   ```

3. **Update `.env.local` in marketing site:**
   ```env
   NEXT_PUBLIC_APP_SUBDOMAIN_URL=http://localhost:3001
   ```

4. **Enable redirects in `.env.local`:**
   ```env
   NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP=true
   ```

5. **Test redirects:**
   - Visit `http://localhost:3000/auth/login` → Should redirect to `http://localhost:3001/login` (if enabled)
   - Visit `http://localhost:3000/auth/signup` → Stays on marketing site
   - Visit `http://localhost:3000/pricing` → Stays on marketing site

### Test in Production

1. Set environment variables in your hosting provider (Netlify/Vercel)
2. Deploy both applications
3. Enable redirects by setting `NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP=true` in environment variables

4. Test redirects:
   - Visit `https://hiringjourney.com/auth/login` → Should redirect to `https://app.hiringjourney.com/login` (if enabled)
   - Visit `https://hiringjourney.com/auth/signup` → Stays on marketing site (uses API calls)
   - Visit `https://hiringjourney.com/pricing` → Stays on marketing site (uses API calls)

## Troubleshooting

### Middleware Not Working

1. **Check file location:** Middleware must be at `middleware.ts` (root level), not in route folders
2. **Check environment variables:** Ensure they're set correctly in `.env.local` or hosting provider
3. **Restart dev server:** After changing `.env.local`, restart `npm run dev`
4. **Check build output:** Look for "Middleware" in build output to confirm it's being compiled

### Redirects Not Working

1. **Verify environment variables are set:**
   ```bash
   # Check if variables are loaded
   echo $NEXT_PUBLIC_APP_SUBDOMAIN_URL
   ```

2. **Check browser console:** Look for any errors

3. **Verify app subdomain is accessible:** Ensure `https://app.hiringjourney.com` is reachable

4. **Check middleware matcher:** Ensure the route matches the matcher pattern

### Common Issues

**Issue:** Middleware redirects to wrong URL
- **Solution:** Check `NEXT_PUBLIC_APP_SUBDOMAIN_URL` is set correctly

**Issue:** Redirects work but query parameters are lost
- **Solution:** Already handled - middleware preserves query parameters

**Issue:** Redirects work in dev but not in production
- **Solution:** Ensure environment variables are set in hosting provider (Netlify/Vercel)

## Disabling Redirects

Redirects are **disabled by default**. To enable login redirect, set:

```env
NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP=true
NEXT_PUBLIC_APP_SUBDOMAIN_URL=https://app.hiringjourney.com
```

To disable, simply remove or don't set `NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP`.

## Current Status

✅ **Middleware Location:** `middleware.ts` (root level)  
✅ **Build Status:** Compiling successfully  
✅ **Default Behavior:** Redirects disabled (marketing site works normally)  
✅ **Route Coverage:** `/auth/login` only (optional redirect)  
✅ **Pricing & Signup:** Stay on marketing site, use API calls to app subdomain

## Next Steps

1. Set up the app subdomain project
2. Configure environment variables
3. Test redirects locally
4. Deploy both applications
5. Enable redirects in production when ready
