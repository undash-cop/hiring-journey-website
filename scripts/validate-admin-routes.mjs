#!/usr/bin/env node
/**
 * Ensures admin section routes stay in sync between lib/admin-features.ts
 * and app/app/(admin)/admin/[section]/page.tsx.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

const featuresSource = readFileSync(resolve(root, "lib/admin-features.ts"), "utf8");
const pageSource = readFileSync(
  resolve(root, "app/app/(admin)/admin/[section]/page.tsx"),
  "utf8",
);

const sectionsMatch = featuresSource.match(
  /export const ADMIN_SECTIONS = \[([\s\S]*?)\] as const/,
);
if (!sectionsMatch) {
  console.error("Could not parse ADMIN_SECTIONS from lib/admin-features.ts");
  process.exit(1);
}

const configuredSections = [...sectionsMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);

const routeMapMatch = pageSource.match(/const adminRouteMap[\s\S]*?\{([\s\S]*?)\};/);
if (!routeMapMatch) {
  console.error("Could not parse adminRouteMap from admin section page");
  process.exit(1);
}

const routedSections = [...routeMapMatch[1].matchAll(/^\s*([a-z]+)\s*:/gm)].map((m) => m[1]);

let ok = true;

for (const section of configuredSections) {
  if (!routedSections.includes(section)) {
    console.error(`Missing route for admin section: ${section}`);
    ok = false;
  }
}

for (const section of routedSections) {
  if (!configuredSections.includes(section)) {
    console.error(`Route "${section}" is not listed in ADMIN_SECTIONS`);
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}

console.log(`Admin route validation passed (${configuredSections.length} sections).`);
