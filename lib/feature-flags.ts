import { FEATURE_FLAGS as STATIC_FEATURE_FLAGS, type FeatureFlagKey } from "@/lib/constants";

function readBoolEnv(name: string, defaultValue: boolean): boolean {
  const value = process.env[name];
  if (value === undefined || value === "") return defaultValue;
  return value === "true" || value === "1";
}

/** Runtime feature flags (env can override compile-time defaults). */
export const FEATURE_FLAGS = {
  ...STATIC_FEATURE_FLAGS,
  GOOGLE_OAUTH: readBoolEnv("NEXT_PUBLIC_FEATURE_GOOGLE_OAUTH", STATIC_FEATURE_FLAGS.GOOGLE_OAUTH),
} as const;

export type { FeatureFlagKey };

export function isGoogleOAuthEnabled(): boolean {
  return FEATURE_FLAGS.GOOGLE_OAUTH;
}

/** Keycloak identity-provider alias configured in the realm (default: `google`). */
export function getGoogleIdpAlias(): string {
  return process.env.NEXT_PUBLIC_KEYCLOAK_GOOGLE_IDP_ALIAS?.trim() || "google";
}
