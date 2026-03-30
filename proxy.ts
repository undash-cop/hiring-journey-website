import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optional proxy to redirect login page to app subdomain
 *
 * NOTE: Pricing and Signup pages stay on the marketing site for SEO benefits.
 * They communicate with the app subdomain via API calls (see lib/app-api.ts).
 *
 * Enable redirects by setting:
 * - NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP=true
 * - NEXT_PUBLIC_APP_SUBDOMAIN_URL=https://app.hiringjourney.com
 */
export function proxy(request: NextRequest) {
  const redirectLoginToApp = process.env.NEXT_PUBLIC_REDIRECT_LOGIN_TO_APP === "true";
  const appUrl =
    process.env.NEXT_PUBLIC_APP_SUBDOMAIN_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://app.hiringjourney.com";

  const pathname = request.nextUrl.pathname;

  if (redirectLoginToApp && pathname === "/auth/login") {
    try {
      const appBaseUrl = new URL(appUrl);
      const redirectUrl = new URL("/login", appBaseUrl);
      redirectUrl.search = request.nextUrl.search;
      return NextResponse.redirect(redirectUrl);
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login"],
};
