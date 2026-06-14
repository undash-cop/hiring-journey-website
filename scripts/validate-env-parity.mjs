#!/usr/bin/env node
/**
 * Ensures env templates define the same required keys across local, staging, and CI.
 * Run in CI and before staging/prod deploys: npm run validate:env:parity
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

const FRONTEND_REQUIRED = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_KEYCLOAK_URL",
  "NEXT_PUBLIC_KEYCLOAK_REALM",
  "NEXT_PUBLIC_KEYCLOAK_CLIENT_ID",
];

const BACKEND_REQUIRED = [
  "KEYCLOAK_SERVER_URL",
  "KEYCLOAK_REALM",
  "KEYCLOAK_AUDIENCE",
  "CORS_ORIGINS",
  "DATABASE_URL",
];

const FRONTEND_TEMPLATES = [
  { label: ".env.example", path: ".env.example" },
  { label: ".env.staging.example", path: ".env.staging.example" },
];

const BACKEND_TEMPLATES = [
  { label: "backend/.env.example", path: "backend/.env.example" },
  { label: "backend/.env.staging.example", path: "backend/.env.staging.example" },
];

function parseEnvKeys(filePath) {
  const text = readFileSync(resolve(root, filePath), "utf8");
  const keys = new Set();
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    keys.add(trimmed.slice(0, eq).trim());
  }
  return keys;
}

function parseEnvValues(filePath) {
  const text = readFileSync(resolve(root, filePath), "utf8");
  const values = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    values[key] = value;
  }
  return values;
}

function checkRequired(label, keys, required) {
  const missing = required.filter((key) => !keys.has(key));
  if (missing.length > 0) {
    console.error(`${label} is missing required keys:\n${missing.map((k) => `  - ${k}`).join("\n")}`);
    return false;
  }
  return true;
}

let ok = true;

for (const template of FRONTEND_TEMPLATES) {
  const keys = parseEnvKeys(template.path);
  ok = checkRequired(template.label, keys, FRONTEND_REQUIRED) && ok;
}

for (const template of BACKEND_TEMPLATES) {
  const keys = parseEnvKeys(template.path);
  ok = checkRequired(template.label, keys, BACKEND_REQUIRED) && ok;
}

const frontendStaging = parseEnvValues(".env.staging.example");
const backendStaging = parseEnvValues("backend/.env.staging.example");

const crossChecks = [
  [
    "Keycloak realm",
    frontendStaging.NEXT_PUBLIC_KEYCLOAK_REALM,
    backendStaging.KEYCLOAK_REALM,
  ],
  [
    "Keycloak client / audience",
    frontendStaging.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
    backendStaging.KEYCLOAK_AUDIENCE,
  ],
];

for (const [label, frontendValue, backendValue] of crossChecks) {
  if (!frontendValue || !backendValue) {
    console.error(`${label}: missing value in staging templates.`);
    ok = false;
    continue;
  }
  if (frontendValue !== backendValue) {
    console.error(
      `${label} mismatch between frontend and backend staging templates:\n` +
        `  frontend: ${frontendValue}\n` +
        `  backend:  ${backendValue}`,
    );
    ok = false;
  }
}

const stagingAppOrigin = frontendStaging.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
if (stagingAppOrigin && backendStaging.CORS_ORIGINS) {
  if (!backendStaging.CORS_ORIGINS.includes(stagingAppOrigin)) {
    console.error(
      `backend/.env.staging.example CORS_ORIGINS must include NEXT_PUBLIC_APP_URL origin (${stagingAppOrigin}).`,
    );
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}

console.log("Environment template parity validation passed.");
