import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Compatibility redirect for legacy auth URL.
 * Keep `/auth/login` working by forwarding to `/app/login` on the same host.
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/auth/login") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/app/login";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login"],
};
