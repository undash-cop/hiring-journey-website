import type Keycloak from "keycloak-js";
import { keycloak } from "@/lib/keycloak";
import { reportAuthError } from "@/lib/auth-errors";
import {
  getAuthCallbackRedirectUri,
  getSilentCheckSsoAbsoluteUrl,
} from "@/lib/keycloak-oauth-redirect";
import { useAuthStore } from "@/components/app/store/authStore";
import type { UserRole } from "@/components/app/types";

let initPromise: Promise<boolean> | null = null;

function parseJwtPayload(token: string): Record<string, unknown> | undefined {
  try {
    const payload = token.split(".")[1];
    if (!payload) return undefined;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalized)) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

function roleFromToken(kc: Keycloak): UserRole {
  const roles = kc.tokenParsed?.realm_access?.roles ?? [];
  return roles.includes("admin") ? "admin" : "candidate";
}

/** Copy tokens from a callback-scoped client onto the app singleton. */
export function adoptKeycloakSession(from: Keycloak): void {
  keycloak.token = from.token;
  keycloak.refreshToken = from.refreshToken;
  keycloak.idToken = from.idToken;
  keycloak.tokenParsed = from.tokenParsed;
  keycloak.refreshTokenParsed = from.refreshTokenParsed;
  keycloak.idTokenParsed = from.idTokenParsed;
  keycloak.authenticated = from.authenticated;
  keycloak.subject = from.subject;
  keycloak.realmAccess = from.realmAccess;
  keycloak.resourceAccess = from.resourceAccess;
  keycloak.timeSkew = from.timeSkew;
  keycloak.responseMode = from.responseMode;
  keycloak.flow = from.flow;
  keycloak.didInitialize = true;
  initPromise = Promise.resolve(true);
}

/** Persist session to zustand (survives full page reload after callback redirect). */
export function syncAuthStoreFromKeycloak(from: Keycloak): void {
  if (!from.token) return;
  useAuthStore.getState().login({
    token: from.token,
    refreshToken: from.refreshToken,
    user: {
      id: 0,
      name:
        (from.tokenParsed?.preferred_username as string | undefined) ??
        (from.tokenParsed?.name as string | undefined) ??
        (from.tokenParsed?.email as string | undefined) ??
        "User",
      email: (from.tokenParsed?.email as string | undefined) ?? "",
      role: roleFromToken(from),
    },
  });
}

/** Restore singleton Keycloak state from persisted auth store. */
export function hydrateKeycloakFromAuthStore(): boolean {
  const { token, refreshToken } = useAuthStore.getState();
  if (!token) return false;

  keycloak.token = token;
  keycloak.refreshToken = refreshToken ?? undefined;
  keycloak.tokenParsed = parseJwtPayload(token) as Keycloak["tokenParsed"];
  keycloak.authenticated = true;
  keycloak.didInitialize = true;
  initPromise = Promise.resolve(true);
  return true;
}

/** Clear local session without requiring a fully initialized Keycloak adapter. */
export function clearAuthSession(): void {
  useAuthStore.getState().logout();
  resetKeycloakInit();
  keycloak.authenticated = false;
  keycloak.token = undefined;
  keycloak.refreshToken = undefined;
  keycloak.idToken = undefined;
  keycloak.tokenParsed = undefined;
  keycloak.didInitialize = false;
}

export function resetKeycloakInit(): void {
  initPromise = null;
}

/**
 * Single Keycloak init for the /app/* shell.
 * Skips network SSO when persisted store or singleton already has a session.
 */
export function ensureKeycloakInit(): Promise<boolean> {
  if (keycloak.authenticated) {
    return Promise.resolve(true);
  }

  if (hydrateKeycloakFromAuthStore()) {
    return Promise.resolve(true);
  }

  if (!initPromise) {
    initPromise = keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        responseMode: "query",
        redirectUri: getAuthCallbackRedirectUri(),
        silentCheckSsoRedirectUri: getSilentCheckSsoAbsoluteUrl(),
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        if (authenticated && keycloak.token) {
          syncAuthStoreFromKeycloak(keycloak);
        }
        if (!authenticated) {
          initPromise = null;
        }
        return authenticated;
      })
      .catch((error) => {
        initPromise = null;
        reportAuthError("auth_failed", {
          phase: "ensureKeycloakInit",
          message: error instanceof Error ? error.message : String(error),
        });
        throw error;
      });
  }

  return initPromise;
}

/** Reset init state (tests only). */
export function resetKeycloakInitForTests(): void {
  initPromise = null;
}
