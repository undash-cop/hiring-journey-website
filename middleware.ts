import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optional middleware to redirect login page to app subdomain
 * 
 * NOTE: Pricing and Signup pages stay on the marketing site for SEO benefits.
 * They communicate with the app subdomain via API calls (see lib/app-api.ts).
 * 
 * Only login can optionally redirect to app subdomain if needed.
 * 
 * Enable redirects by setting:
 * - NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP=true (for login page only)
 * - NEXT_PUBLIC_APP_SUBDOMAIN_URL=https://app.hiringjourney.com (app subdomain URL)
 * 
 * By default, redirects are disabled and the marketing site works normally.
 */
export function middleware(request: NextRequest) {
  const redirectLoginToApp = process.env.NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP === "true";
  const appUrl = process.env.NEXT_PUBLIC_APP_SUBDOMAIN_URL || process.env.NEXT_PUBLIC_APP_URL || "https://app.hiringjourney.com";

  const pathname = request.nextUrl.pathname;

  // Only redirect login page (optional)
  // Signup and pricing stay on marketing site for SEO
  if (redirectLoginToApp && pathname === "/auth/login") {
    try {
      const appBaseUrl = new URL(appUrl);
      const redirectUrl = new URL("/login", appBaseUrl);
      // Preserve query parameters if any
      redirectUrl.search = request.nextUrl.search;

      return NextResponse.redirect(redirectUrl);
    } catch (error) {
      console.error("Error redirecting to app subdomain:", error);
      // If redirect fails, continue normally
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
  ],
};
