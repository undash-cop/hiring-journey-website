"use client";

/**
 * Canonical site origin for OAuth `redirect_uri` / silent SSO when it must not use the
 * browser bar (reverse proxy, preview URL, etc.). Leave unset in local dev.
 */
export function getOAuthRedirectOrigin(): string {
  const forced = process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_ORIGIN?.replace(/\/$/, "");
  if (forced) return forced;
  if (typeof window !== "undefined") {
    return window.location.origin.replace(/\/$/, "");
  }
  return "";
}

/** e.g. `https://host/app/login` — must match a Keycloak client "Valid redirect URI". */
export function getAppOAuthRedirectUri(): string {
  if (typeof window === "undefined") return "";
  return `${getOAuthRedirectOrigin()}${window.location.pathname}`;
}

/** Marketing `/auth/callback` flow. */
export function getAuthCallbackRedirectUri(): string {
  return `${getOAuthRedirectOrigin()}/auth/callback`;
}

/** Post-logout landing — marketing home (must be in Keycloak post-logout redirect URIs). */
export function getLogoutRedirectUri(): string {
  const origin =
    getOAuthRedirectOrigin() ||
    (typeof window !== "undefined" ? window.location.origin.replace(/\/$/, "") : "") ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_AUTH_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";
  return `${origin}/`;
}

export function getSilentCheckSsoAbsoluteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_KEYCLOAK_SILENT_CHECK_SSO_URI?.trim();
  if (explicit) return explicit;
  let origin = getOAuthRedirectOrigin();
  if (!origin && typeof window !== "undefined") {
    origin = window.location.origin;
  }
  return `${origin}/silent-check-sso.html`;
}
