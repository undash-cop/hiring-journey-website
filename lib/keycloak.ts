"use client";

import Keycloak from "keycloak-js";
import type { KeycloakAdapter, KeycloakRedirectUriOptions, KeycloakServerConfig } from "keycloak-js";
import { getKeycloakJsConfig } from "@/lib/keycloak-client-config";
import { getAuthCallbackRedirectUri } from "@/lib/keycloak-oauth-redirect";
import { reportAuthError } from "@/lib/auth-errors";

/** Where to land on the app after Keycloak returns to `/auth/callback`. */
export const KC_POST_AUTH_TARGET_KEY = "hj_kc_post_auth_target";

const PKCE_SESSION_KEY = "hj_oidc_code_verifier";

function resolveKeycloakServerConfig(): KeycloakServerConfig {
  return getKeycloakJsConfig();
}

function assertKeycloakConfigured(config: KeycloakServerConfig): void {
  if (!config.url || !config.realm || !config.clientId) {
    throw new Error(
      "Missing Keycloak configuration. Set NEXT_PUBLIC_KEYCLOAK_URL, NEXT_PUBLIC_KEYCLOAK_REALM, and NEXT_PUBLIC_KEYCLOAK_CLIENT_ID."
    );
  }
}

/**
 * Shared Keycloak server config and singleton instance (env-backed).
 * Redirect helpers use `new Keycloak(keycloakServerConfig)` because each instance may `init` only once.
 */
export const keycloakServerConfig = resolveKeycloakServerConfig();
export const keycloak = new Keycloak(keycloakServerConfig);

/** OIDC redirect_uri for `/auth/callback` — must match Keycloak "Valid redirect URIs". */
function getCallbackUrl(): string {
  return getAuthCallbackRedirectUri();
}

/**
 * Unified single-app hosting: post-login resolves to `/app/dashboard` on current origin.
 */
export function getAppPostLoginOrigin(): string {
  return window.location.origin?.replace(/\/$/, "") || "";
}

/** Full URL after `/auth/callback` (or when already authenticated during register). */
export function resolvePostLoginHref(target: "dashboard" | "onboarding"): string {
  const explicit =
    window.location.origin?.replace(/\/$/, "") || "";
  const path = target === "onboarding" ? "/app/dashboard" : "/app/dashboard";
  return `${explicit}${path}`;
}

/**
 * Keycloak-js stores PKCE state in localStorage (`kc-callback-*`). Mirror `code_verifier` into
 * sessionStorage for visibility/consistency before navigation.
 */
function mirrorPkceVerifierToSessionStorage(loginUrl: string): void {
  try {
    const state = new URL(loginUrl, window.location.origin).searchParams.get("state");
    if (!state) return;
    const raw = window.localStorage.getItem(`kc-callback-${state}`);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { pkceCodeVerifier?: string };
    if (parsed.pkceCodeVerifier) {
      window.sessionStorage.setItem(PKCE_SESSION_KEY, parsed.pkceCodeVerifier);
    }
  } catch {
    // ignore malformed storage
  }
}

function makePkceMirrorAdapter(kc: Keycloak): KeycloakAdapter {
  const redirectUri = (options?: KeycloakRedirectUriOptions) =>
    options?.redirectUri ?? kc.redirectUri ?? getCallbackUrl();

  return {
    login: async (options) => {
      const url = await kc.createLoginUrl(options);
      mirrorPkceVerifierToSessionStorage(url);
      window.location.assign(url);
      await new Promise<void>(() => {});
    },
    register: async (options) => {
      const url = await kc.createRegisterUrl(options);
      mirrorPkceVerifierToSessionStorage(url);
      window.location.assign(url);
      await new Promise<void>(() => {});
    },
    logout: async (options) => {
      window.location.replace(kc.createLogoutUrl(options));
    },
    accountManagement: async () => {
      const url = kc.createAccountUrl();
      window.location.href = url;
    },
    redirectUri,
  };
}

function newKeycloakClient(): Keycloak {
  return new Keycloak(keycloakServerConfig);
}

/**
 * Sends the user to Keycloak login (PKCE). After `/auth/callback`, they are redirected to the app dashboard.
 */
export async function redirectToLogin(): Promise<void> {
  if (typeof window === "undefined") return;
  assertKeycloakConfigured(keycloakServerConfig);
  const { resetKeycloakInit } = await import("@/lib/keycloak-init");
  resetKeycloakInit();
  window.sessionStorage.setItem(KC_POST_AUTH_TARGET_KEY, "dashboard");
  const kc = newKeycloakClient();
  await kc.init({
    adapter: makePkceMirrorAdapter(kc),
    onLoad: "login-required",
    redirectUri: getCallbackUrl(),
    pkceMethod: "S256",
    responseMode: "query",
    checkLoginIframe: false,
  });
}

/**
 * Sends the user to Keycloak via the Google identity provider (requires Google IdP in the realm).
 */
export async function redirectToGoogleAuth(mode: "login" | "signup"): Promise<void> {
  if (typeof window === "undefined") return;
  assertKeycloakConfigured(keycloakServerConfig);
  const { getGoogleIdpAlias } = await import("@/lib/feature-flags");
  const { resetKeycloakInit } = await import("@/lib/keycloak-init");
  resetKeycloakInit();
  window.sessionStorage.setItem(KC_POST_AUTH_TARGET_KEY, mode === "signup" ? "onboarding" : "dashboard");
  const kc = newKeycloakClient();
  await kc.init({
    adapter: makePkceMirrorAdapter(kc),
    redirectUri: getCallbackUrl(),
    pkceMethod: "S256",
    responseMode: "query",
    checkLoginIframe: false,
  });
  await kc.login({
    idpHint: getGoogleIdpAlias(),
    redirectUri: getCallbackUrl(),
  });
}

/**
 * Sends the user to Keycloak registration (`kc_action=register` via register endpoint). After `/auth/callback`,
 * they are redirected to app onboarding.
 */
export async function redirectToRegister(): Promise<void> {
  if (typeof window === "undefined") return;
  assertKeycloakConfigured(keycloakServerConfig);
  window.sessionStorage.setItem(KC_POST_AUTH_TARGET_KEY, "onboarding");
  const kc = newKeycloakClient();
  await kc.init({
    adapter: makePkceMirrorAdapter(kc),
    redirectUri: getCallbackUrl(),
    pkceMethod: "S256",
    responseMode: "query",
    checkLoginIframe: false,
  });
  if (!kc.authenticated) {
    await kc.register({ redirectUri: getCallbackUrl() });
  } else {
    window.location.assign(resolvePostLoginHref("onboarding"));
  }
}

export type AuthCallbackResult = {
  href: string;
  event: "signup" | "login";
};

/**
 * Handles Keycloak OIDC redirect on `/auth/callback` (`?code=...`).
 * Returns post-login path on success; throws on failure.
 */
export async function exchangeKeycloakCallback(): Promise<AuthCallbackResult> {
  if (typeof window === "undefined") {
    throw new Error("exchangeKeycloakCallback requires a browser environment");
  }
  assertKeycloakConfigured(keycloakServerConfig);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");
  if (!code || !state) {
    reportAuthError("callback_missing_code", { search: window.location.search });
    throw new Error("auth_failed");
  }

  const handledKey = `hj_kc_handled_${state}`;
  const target = window.sessionStorage.getItem(KC_POST_AUTH_TARGET_KEY);
  const mode = target === "onboarding" ? "onboarding" : "dashboard";
  const authEvent = mode === "onboarding" ? "signup" : "login";
  if (window.sessionStorage.getItem(handledKey)) {
    return { href: resolvePostLoginHref(mode), event: authEvent };
  }
  window.sessionStorage.setItem(handledKey, "1");

  const { adoptKeycloakSession, resetKeycloakInit, syncAuthStoreFromKeycloak } =
    await import("@/lib/keycloak-init");
  resetKeycloakInit();
  const kc = newKeycloakClient();
  const authenticated = await kc.init({
    onLoad: "check-sso",
    redirectUri: getCallbackUrl(),
    pkceMethod: "S256",
    responseMode: "query",
    checkLoginIframe: false,
  });
  if (!authenticated) {
    reportAuthError("callback_exchange_failed", { state });
    throw new Error("auth_failed");
  }

  adoptKeycloakSession(kc);
  syncAuthStoreFromKeycloak(kc);

  window.sessionStorage.removeItem(KC_POST_AUTH_TARGET_KEY);
  return { href: resolvePostLoginHref(mode), event: authEvent };
}
