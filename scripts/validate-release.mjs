#!/usr/bin/env node
/**
 * Phase 6 quality gate — runs static validators before release.
 * Usage: npm run validate:release
 */

import { spawnSync } from "node:child_process";

const steps = [
  "validate:env:parity",
  "validate:marketing",
  "validate:candidate",
  "validate:admin",
  "typecheck",
  "lint",
];

for (const step of steps) {
  console.log(`\n▶ npm run ${step}`);
  const result = spawnSync("npm", ["run", step], { stdio: "inherit", shell: false });
  if (result.status !== 0) {
    console.error(`\n✗ ${step} failed`);
    process.exit(result.status ?? 1);
  }
}

console.log("\n✓ Release validation passed");
