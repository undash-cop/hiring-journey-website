# Cursor Rules for app.hiringjourney.com

This document provides comprehensive guidelines for building the app subdomain application (`app.hiringjourney.com`) that integrates with the marketing website (`hiringjourney.com`).

## Project Overview

**Purpose:** Build a Next.js 15 application for the app subdomain that provides:
- API endpoints for the marketing website
- User authentication and session management
- Dashboard and user features
- Payment processing and plan management

**Base URL:** `https://app.hiringjourney.com`  
**Marketing Site:** `https://hiringjourney.com` (calls APIs via CORS)

## Tech Stack Requirements

- **Framework:** Next.js 15 (App Router)
- **React:** 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Database:** Your choice (PostgreSQL, MongoDB, etc.)
- **Authentication:** JWT or session-based (your preference)
- **Payment:** Razorpay/PayU/Stripe (for India market)

## Project Structure

```
app.hiringjourney.com/
├── app/
│   ├── api/                    # API routes (CRITICAL)
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   │   └── route.ts    # POST /api/auth/signup
│   │   │   ├── login/
│   │   │   │   └── route.ts    # POST /api/auth/login
│   │   │   ├── forgot-password/
│   │   │   │   └── route.ts    # POST /api/auth/forgot-password
│   │   │   └── verify-invite/
│   │   │       └── route.ts    # POST /api/auth/verify-invite
│   │   └── pricing/
│   │       ├── plans/
│   │       │   └── route.ts    # GET /api/pricing/plans
│   │       └── checkout/
│   │           └── route.ts    # POST /api/pricing/checkout
│   ├── login/                  # Login page (if redirect enabled)
│   │   └── page.tsx
│   ├── dashboard/              # Main dashboard
│   │   └── page.tsx
│   └── layout.tsx
├── lib/
│   ├── cors.ts                 # CORS utility
│   ├── auth.ts                 # Authentication utilities
│   ├── db.ts                   # Database connection
│   └── validation.ts           # Zod schemas
└── .env.local
```

## Critical: CORS Configuration

**ALL API endpoints MUST allow CORS from the marketing domain.**

### Required CORS Setup

Create `lib/cors.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://hiringjourney.com",
  "http://localhost:3000", // Development
];

export function getCORSHeaders(origin: string | null): Headers {
  const headers = new Headers();
  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  return headers;
}

export function handleCORS(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: getCORSHeaders(origin),
    });
  }
  return null;
}
```

### Use in Every API Route

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getCORSHeaders, handleCORS } from "@/lib/cors";

export async function POST(request: NextRequest) {
  // Handle CORS preflight
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  const origin = request.headers.get("origin");
  const headers = getCORSHeaders(origin);

  // Your API logic here...
  
  return NextResponse.json(
    { success: true, data: {} },
    { headers }
  );
}
```

## Required API Endpoints

### 1. POST /api/auth/signup

**Purpose:** Create new user account from marketing site signup form.

**Request Body:**
```typescript
{
  name: string;              // Required, min 2 chars
  email: string;            // Required, valid email
  password: string;         // Required, min 8 chars, uppercase, lowercase, number
  inviteCode?: string;      // Optional, min 4 chars (required for free plan)
  planName?: "free" | "starter" | "pro" | "elite";
  billingCycle?: "monthly" | "yearly";
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "plan": "pro",
    "billingCycle": "yearly"
  }
}
```

**Implementation Requirements:**
- Validate all inputs using Zod
- Check if email already exists (return 409 Conflict)
- Verify invite code if provided (return 422 if invalid)
- Hash password using bcrypt
- Create user account in database
- Assign plan if `planName` provided
- Set up subscription if paid plan + `billingCycle`
- Send welcome email
- Create session/cookie for authentication
- Return user data

---

### 2. POST /api/auth/login

**Purpose:** Authenticate user from marketing site login form.

**Request Body:**
```typescript
{
  email: string;
  password: string;
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "plan": "pro"
  }
}
```

**Implementation Requirements:**
- Verify email and password
- Check account status (not locked/suspended)
- Create session/cookie
- Return user data
- Implement rate limiting (10 requests per 15 min per IP)

---

### 3. POST /api/auth/forgot-password

**Purpose:** Request password reset email.

**Request Body:**
```typescript
{
  email: string;
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

**Implementation Requirements:**
- Generate secure reset token (expires in 1 hour)
- Store token in database
- Send password reset email with link
- **Security:** Always return success even if email doesn't exist (prevents email enumeration)
- Rate limit: 3 requests per hour per email

---

### 4. POST /api/auth/verify-invite

**Purpose:** Verify invite code validity (called before signup).

**Request Body:**
```typescript
{
  code: string;  // min 4 chars
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Invite code is valid",
  "data": {
    "code": "ABC123",
    "plan": "free",
    "expiresAt": "2026-12-31T23:59:59Z"
  }
}
```

**Implementation Requirements:**
- Check if code exists
- Check if code has been used
- Check if code has expired
- Return plan associated with code
- **Don't consume the code** (only verify)

---

### 5. GET /api/pricing/plans

**Purpose:** Get available pricing plans (optional - marketing site can use static data).

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "free",
        "name": "Free",
        "price": 0,
        "yearlyPrice": 0,
        "description": "...",
        "features": [...],
        "credits": 50
      }
      // ... more plans
    ]
  }
}
```

**Implementation Requirements:**
- Return all available plans
- Include monthly and yearly pricing
- Include features, credits, metadata
- Can be cached (static data)

---

### 6. POST /api/pricing/checkout

**Purpose:** Create checkout session for plan purchase.

**Request Body:**
```typescript
{
  planId: "free" | "starter" | "pro" | "elite";
  billingCycle: "monthly" | "yearly";
  returnUrl?: string;
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://payment-gateway.com/checkout/...",
    "sessionId": "checkout-session-id"
  }
}
```

**Implementation Requirements:**
- **Requires authentication** (user must be logged in)
- Create payment session with payment gateway
- Store session ID for tracking
- Return checkout URL for redirect
- Handle free plan (no payment needed)

---

## Error Handling Standards

### Standard Error Response Format

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": {
    "fieldName": "Field-specific error message"
  }
}
```

### HTTP Status Codes

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required/failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., email exists)
- `410 Gone` - Resource expired
- `422 Unprocessable Entity` - Validation error
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Validation Schemas

Create `lib/validation.ts` with Zod schemas:

```typescript
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[0-9]/, "Password must contain number"),
  inviteCode: z.string().min(4).optional(),
  planName: z.enum(["free", "starter", "pro", "elite"]).optional(),
  billingCycle: z.enum(["monthly", "yearly"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
```

## Rate Limiting

Implement rate limiting for all endpoints:

- **Signup:** 5 requests per hour per IP
- **Login:** 10 requests per 15 minutes per IP
- **Forgot Password:** 3 requests per hour per email
- **Verify Invite:** 20 requests per minute per IP

## Security Requirements

1. **Password Hashing:** Use bcrypt (cost factor 10+)
2. **Input Validation:** Validate all inputs with Zod
3. **SQL Injection:** Use parameterized queries
4. **XSS Protection:** Sanitize user input
5. **CSRF Protection:** Implement CSRF tokens
6. **HTTPS Only:** Enforce HTTPS in production
7. **Secure Cookies:** Set secure, httpOnly, sameSite flags
8. **Rate Limiting:** Prevent brute force attacks

## Environment Variables

Create `.env.local`:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=https://app.hiringjourney.com

# Marketing Site (for CORS)
NEXT_PUBLIC_MARKETING_URL=https://hiringjourney.com

# Database
DATABASE_URL=your-database-url

# Authentication
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret

# Email Service
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
EMAIL_FROM=noreply@hiringjourney.com

# Payment Gateway (Razorpay for India)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Invite Codes
INVITE_CODE_LENGTH=6
INVITE_CODE_EXPIRY_DAYS=90
```

## Integration with Marketing Site

The marketing site (`hiringjourney.com`) will call these APIs:

1. **Signup Flow:**
   - User fills signup form on marketing site
   - Form submits to `POST /api/auth/signup` with plan data
   - After success, redirect to `app.hiringjourney.com/dashboard`

2. **Login Flow:**
   - User fills login form on marketing site
   - Form submits to `POST /api/auth/login`
   - After success, redirect to `app.hiringjourney.com/dashboard`

3. **Plan Selection:**
   - User selects plan on pricing page
   - Plan data passed to signup via URL params
   - Signup API receives `planName` and `billingCycle`

## Code Patterns

### API Route Template

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getCORSHeaders, handleCORS } from "@/lib/cors";
import { z } from "zod";

const schema = z.object({
  // Define schema
});

export async function OPTIONS(request: NextRequest) {
  return handleCORS(request) || new NextResponse(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  const origin = request.headers.get("origin");
  const headers = getCORSHeaders(origin);

  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Business logic here

    return NextResponse.json(
      { success: true, data: {} },
      { status: 201, headers }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.flatten().fieldErrors,
        },
        { status: 400, headers }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500, headers }
    );
  }
}
```

## Testing Requirements

1. **Unit Tests:** Test validation schemas, utilities
2. **Integration Tests:** Test API endpoints with test database
3. **E2E Tests:** Test full signup/login flow
4. **CORS Tests:** Verify CORS headers are set correctly
5. **Rate Limiting Tests:** Verify rate limits work

## Next Steps

1. Set up Next.js 15 project with TypeScript
2. Install dependencies (Zod, bcrypt, database client, etc.)
3. Create CORS utility (`lib/cors.ts`)
4. Implement all 6 API endpoints
5. Set up database schema
6. Implement authentication system
7. Add rate limiting middleware
8. Write tests
9. Deploy to production

## References

- Marketing site API client: `hiring-journey-website/lib/app-api.ts`
- Architecture decision: `hiring-journey-website/ARCHITECTURE_DECISION.md`
- App subdomain setup: `hiring-journey-website/APP_SUBDOMAIN_SETUP.md`

---

**Remember:** The marketing site depends on these APIs. Ensure all endpoints are implemented correctly with proper CORS, validation, and error handling.
