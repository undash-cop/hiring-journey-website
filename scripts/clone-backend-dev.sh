#!/usr/bin/env bash
# Clone the API repo for local development / CI parity checks (not used on Netlify).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND_DIR="${ROOT}/backend"
REPO="${HJ_BACKEND_REPO:-https://github.com/undash-cop/hiring-journey-backend.git}"

if [[ -d "${BACKEND_DIR}/.git" ]] || [[ -f "${BACKEND_DIR}/pyproject.toml" ]]; then
  echo "backend/ already present at ${BACKEND_DIR}"
  exit 0
fi

echo "Cloning ${REPO} into backend/ ..."
git clone --depth 1 "${REPO}" "${BACKEND_DIR}"
