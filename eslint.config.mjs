import nextVitals from "eslint-config-next/core-web-vitals";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ["lib/generated/**", ".next/**", "node_modules/**"],
  },
  ...nextVitals,
];
