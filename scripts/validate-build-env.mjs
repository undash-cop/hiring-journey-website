#!/usr/bin/env node
/**
 * Validates required NEXT_PUBLIC_* vars before production/CI builds.
 * Skipped for local `npm run dev` (not invoked there).
 */

const isCi = process.env.CI === "true";
const requireEnv = process.env.REQUIRE_BUILD_ENV === "true";

if (!isCi && !requireEnv) {
  process.exit(0);
}

const required = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_KEYCLOAK_URL",
  "NEXT_PUBLIC_KEYCLOAK_REALM",
  "NEXT_PUBLIC_KEYCLOAK_CLIENT_ID",
];

const missing = required.filter((key) => !process.env[key]?.trim());

if (missing.length > 0) {
  console.error(
    "Build environment validation failed. Set the following variables:\n" +
      missing.map((k) => `  - ${k}`).join("\n"),
  );
  process.exit(1);
}

if (
  process.env.NEXT_PUBLIC_API_URL?.includes("localhost") &&
  process.env.APP_ENV === "production"
) {
  console.error("NEXT_PUBLIC_API_URL must not point to localhost in production builds.");
  process.exit(1);
}

console.log("Build environment validation passed.");
