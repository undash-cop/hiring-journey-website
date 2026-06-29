#!/usr/bin/env bash
# Wrapper from website repo root → backend dev server.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [[ ! -f "${ROOT}/backend/pyproject.toml" ]]; then
  echo "backend/ not found. Run: ./scripts/clone-backend-dev.sh"
  exit 1
fi

exec "${ROOT}/backend/scripts/dev-server.sh"
