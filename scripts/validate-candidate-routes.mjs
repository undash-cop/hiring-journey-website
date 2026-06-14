#!/usr/bin/env node
/**
 * Ensures candidate section routes stay in sync between lib/candidate-features.ts
 * and app/app/(candidate)/[section]/page.tsx.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

const featuresSource = readFileSync(resolve(root, "lib/candidate-features.ts"), "utf8");
const pageSource = readFileSync(
  resolve(root, "app/app/(candidate)/[section]/page.tsx"),
  "utf8",
);

const sectionsMatch = featuresSource.match(
  /export const CANDIDATE_SECTIONS = \[([\s\S]*?)\] as const/,
);
if (!sectionsMatch) {
  console.error("Could not parse CANDIDATE_SECTIONS from lib/candidate-features.ts");
  process.exit(1);
}

const configuredSections = [...sectionsMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

const routeMapMatch = pageSource.match(/const candidateRouteMap[\s\S]*?\{([\s\S]*?)\};/);
if (!routeMapMatch) {
  console.error("Could not parse candidateRouteMap from candidate section page");
  process.exit(1);
}

const routedSections = [...routeMapMatch[1].matchAll(/^\s*"?([^":\s]+)"?\s*:/gm)].map(
  (m) => m[1],
);

let ok = true;

for (const section of configuredSections) {
  if (!routedSections.includes(section)) {
    console.error(`Missing route for candidate section: ${section}`);
    ok = false;
  }
}

for (const section of routedSections) {
  if (!configuredSections.includes(section)) {
    console.error(`Route "${section}" is not listed in CANDIDATE_SECTIONS`);
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}

console.log(`Candidate route validation passed (${configuredSections.length} sections).`);
