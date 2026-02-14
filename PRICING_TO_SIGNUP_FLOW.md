# Pricing to Signup Flow

## Overview

When a user clicks a plan on the pricing page, the selected plan data is passed to the signup page and included in the signup API call to the app subdomain.

## Flow Diagram

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Pricing Page   │         │   Signup Page   │         │  App Subdomain  │
│  /pricing       │  ────>  │  /auth/signup   │  ────>  │  API Endpoint   │
│                 │  URL    │                 │  POST   │  /api/auth/     │
│  User clicks    │  Params │  Form submits   │  Request│  signup         │
│  "Get Started"  │         │  with plan data │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## Implementation Details

### 1. Pricing Page (`components/pricing/pricing-plans.tsx`)

When a user clicks a plan button, the `handlePlanClick` function:
- Tracks the plan selection with analytics
- Navigates to `/auth/signup` with URL query parameters:
  - `plan`: Plan name in lowercase (e.g., "free", "starter", "pro", "elite")
  - `billing`: Billing cycle ("monthly" or "yearly")

**Example URL:**
```
/auth/signup?plan=pro&billing=yearly
```

### 2. Signup Page (`app/auth/signup/page.tsx`)

The signup page wraps the `SignupForm` component in a `Suspense` boundary to handle the async `useSearchParams` hook.

### 3. Signup Form (`components/auth/signup-form.tsx`)

The form component:
- Uses `useSearchParams()` to read URL query parameters
- Extracts `plan` and `billing` parameters
- Displays a visual indicator showing the selected plan (if available)
- Includes plan data in the signup API payload

**Plan Data Display:**
- Shows a highlighted banner with selected plan name and billing cycle
- Example: "Selected Plan: Pro (Yearly billing)"

**API Payload:**
```typescript
{
  name: string;
  email: string;
  password: string;
  inviteCode?: string;
  planName?: string;        // e.g., "free", "starter", "pro", "elite"
  billingCycle?: "monthly" | "yearly";
}
```

### 4. API Client (`lib/app-api.ts`)

The `signupUser` function accepts plan data and sends it to the app subdomain API endpoint:

```typescript
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "planName": "pro",
  "billingCycle": "yearly"
}
```

## Plan Names

The following plan names are used (all lowercase):
- `free` - Free plan
- `starter` - Starter plan (₹299/month)
- `pro` - Pro plan (₹699/month)
- `elite` - Elite plan (₹1199/month)

## Billing Cycles

- `monthly` - Monthly billing
- `yearly` - Yearly billing (with savings)

## App Subdomain Requirements

The app subdomain API endpoint (`/api/auth/signup`) should:

1. **Accept plan data** in the request body:
   ```typescript
   {
     planName?: string;
     billingCycle?: "monthly" | "yearly";
   }
   ```

2. **Process plan assignment**:
   - Assign the selected plan to the new user account
   - Handle billing cycle for paid plans
   - Set up subscription if applicable

3. **Return success response**:
   ```json
   {
     "success": true,
     "message": "Account created successfully",
     "userId": "...",
     "plan": "pro"
   }
   ```

## User Experience

1. **On Pricing Page:**
   - User selects a plan (e.g., "Pro - Yearly")
   - Clicks "Get Started" button
   - Navigates to signup page

2. **On Signup Page:**
   - User sees a banner: "Selected Plan: Pro (Yearly billing)"
   - User fills out signup form
   - Plan data is automatically included in signup

3. **After Signup:**
   - User is redirected to `app.hiringjourney.com/dashboard`
   - Plan is already activated based on signup data

## Edge Cases

### Direct Signup (No Plan Selected)
- If user navigates directly to `/auth/signup` without plan parameters:
  - No plan banner is shown
  - Signup proceeds normally without plan data
  - User can select a plan later in the app

### Invalid Plan Data
- If invalid plan name or billing cycle is passed:
  - Plan data is simply omitted from API call
  - Signup proceeds normally
  - No error is shown to user

### Plan Selection After Signup
- Users can change plans after signup through the app dashboard
- The initial plan selection is just a convenience feature

## Testing

### Test Scenarios

1. **Click Free Plan:**
   - Navigate to `/pricing`
   - Click "Start Free" on Free plan
   - Verify URL: `/auth/signup?plan=free&billing=monthly`
   - Verify banner shows "Selected Plan: Free"

2. **Click Pro Plan (Yearly):**
   - Navigate to `/pricing`
   - Switch to "Yearly" billing
   - Click "Get Started" on Pro plan
   - Verify URL: `/auth/signup?plan=pro&billing=yearly`
   - Verify banner shows "Selected Plan: Pro (Yearly billing)"

3. **Direct Signup:**
   - Navigate directly to `/auth/signup`
   - Verify no plan banner is shown
   - Verify signup works normally

4. **API Call Verification:**
   - Complete signup with plan selected
   - Check network tab for API request
   - Verify `planName` and `billingCycle` are in request body

## Benefits

✅ **Seamless User Experience** - Plan selection flows directly into signup  
✅ **Reduced Friction** - Users don't need to select plan again after signup  
✅ **Better Conversion** - Clear indication of selected plan increases confidence  
✅ **Backend Integration** - Plan assignment happens automatically during signup  
