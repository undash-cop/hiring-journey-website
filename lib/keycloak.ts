"use client";

import Keycloak from "keycloak-js";
import type { KeycloakAdapter, KeycloakRedirectUriOptions, KeycloakServerConfig } from "keycloak-js";

/** Where to land on the app after Keycloak returns to `/auth/callback`. */
export const KC_POST_AUTH_TARGET_KEY = "hj_kc_post_auth_target";

const PKCE_SESSION_KEY = "hj_oidc_code_verifier";

function normalizeKeycloakBaseUrl(raw: string | undefined): string {
  if (!raw) return "";
  const trimmed = raw.replace(/\/$/, "");
  if (trimmed.endsWith("/auth")) return trimmed;
  return `${trimmed}`;
}

function resolveKeycloakServerConfig(): KeycloakServerConfig {
  return {
    url: normalizeKeycloakBaseUrl(process.env.NEXT_PUBLIC_KEYCLOAK_URL),
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM ?? "",
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? "",
  };
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

/**
 * OIDC redirect_uri sent to Keycloak. Must exactly match a "Valid redirect URI" on the client.
 * Defaults to the current browser origin; override when the public URL differs (proxy, preview host, etc.).
 */
function getCallbackUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_ORIGIN?.replace(/\/$/, "");
  if (explicit) {
    return `${explicit}/auth/callback`;
  }
  return `${window.location.origin}/auth/callback`;
}

/** Base URL for the authenticated app (dashboard / onboarding). */
export function getAppPostLoginOrigin(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_APP_SUBDOMAIN_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_APP_POST_LOGIN_ORIGIN?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "https://app.domain.com";
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
    window.location.assign(`${getAppPostLoginOrigin()}/onboarding`);
  }
}

/**
 * Handles Keycloak OIDC redirect on `/auth/callback` (`?code=...`).
 * On success navigates to the app; on failure navigates to `/?error=auth_failed`.
 */
export async function exchangeKeycloakCallback(): Promise<void> {
  if (typeof window === "undefined") return;
  assertKeycloakConfigured(keycloakServerConfig);
  const params = new URLSearchParams(window.location.search);
  if (!params.get("code")) {
    window.location.replace("/?error=auth_failed");
    return;
  }
  const kc = newKeycloakClient();
  await kc.init({
    onLoad: "check-sso",
    redirectUri: getCallbackUrl(),
    pkceMethod: "S256",
    responseMode: "query",
    checkLoginIframe: false,
  });
  if (!kc.authenticated) {
    window.location.replace("/?error=auth_failed");
    return;
  }
  const target = window.sessionStorage.getItem(KC_POST_AUTH_TARGET_KEY);
  window.sessionStorage.removeItem(KC_POST_AUTH_TARGET_KEY);
  const path = target === "onboarding" ? "/onboarding" : "/dashboard";
  window.location.replace(`${getAppPostLoginOrigin()}${path}`);
}
