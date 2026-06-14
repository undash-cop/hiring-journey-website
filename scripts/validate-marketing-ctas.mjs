#!/usr/bin/env node
/**
 * Ensures marketing CTAs use /app/* auth routes (not legacy /auth/* or bare /signup).
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const scanRoots = ["components", "app"];

const forbiddenPatterns = [
  { pattern: /href=["']\/auth\/(login|signup)/, message: "Use /app/login or /app/signup instead of /auth/*" },
  { pattern: /href=["']\/signup["']/, message: "Use /app/signup for product signup CTAs" },
  { pattern: /href=["']\/login["']/, message: "Use /app/login for product login CTAs" },
];

const allowedPaths = new Set([
  "app/auth/login/page.tsx",
  "app/auth/signup/page.tsx",
  "app/auth/forgot-password/page.tsx",
  "app/auth/callback/page.tsx",
  "components/auth/auth-error-notice.tsx",
  "proxy.ts",
]);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "app" && dir.endsWith("components")) continue;
      walk(full, files);
      continue;
    }
    if (/\.(tsx|ts|jsx|js)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

let ok = true;

for (const scanRoot of scanRoots) {
  const base = join(root, scanRoot);
  for (const file of walk(base)) {
    const rel = file.slice(root.length + 1);
    if (allowedPaths.has(rel)) continue;

    const text = readFileSync(file, "utf8");
    for (const { pattern, message } of forbiddenPatterns) {
      if (pattern.test(text)) {
        console.error(`${rel}: ${message}`);
        ok = false;
      }
    }
  }
}

if (!ok) {
  process.exit(1);
}

console.log("Marketing CTA route validation passed.");
