/**
 * API client for communicating with the app subdomain (app.hiringjourney.com)
 * 
 * This allows the marketing site to send data to the app subdomain
 * while keeping pricing and signup pages on the marketing site for SEO.
 */

const APP_API_URL = process.env.NEXT_PUBLIC_APP_SUBDOMAIN_URL || process.env.NEXT_PUBLIC_APP_URL || "https://app.hiringjourney.com";

/**
 * Make an API call to the app subdomain
 */
async function callAppAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${APP_API_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Include cookies for CORS
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `API request failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Signup API - Create a new user account
 */
export async function signupUser(data: {
  name: string;
  email: string;
  password: string;
  inviteCode?: string;
  planName?: string; // e.g., "free", "starter", "pro", "elite"
  billingCycle?: "monthly" | "yearly"; // Billing cycle for paid plans
}) {
  return callAppAPI("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Login API - Authenticate user
 */
export async function loginUser(data: {
  email: string;
  password: string;
}) {
  // Route login through same-origin API to avoid browser CORS/preflight issues
  // when the frontend is opened via a different hostname (e.g. local IP).
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `API request failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Request Password Reset API - Request password reset email
 */
export async function requestPasswordReset(data: {
  email: string;
}) {
  return callAppAPI("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get Pricing Plans - Fetch pricing plans from app subdomain
 * This allows pricing to be managed centrally in the app
 */
export async function getPricingPlans() {
  return callAppAPI("/pricing/plans", {
    method: "GET",
  });
}

/**
 * Create Checkout Session - Initiate payment for a plan
 */
export async function createCheckoutSession(data: {
  planId: string;
  billingCycle: "monthly" | "yearly";
  returnUrl?: string;
}) {
  return callAppAPI("/pricing/checkout", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Verify Invite Code - Check if invite code is valid
 */
export async function verifyInviteCode(code: string) {
  return callAppAPI("/auth/verify-invite", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}
