#!/usr/bin/env bash
# Quick API smoke test for local or staging. Usage:
#   ./scripts/smoke-api.sh
#   API_BASE_URL=https://api-staging.hiringjourney.com ./scripts/smoke-api.sh

set -euo pipefail

BASE="${API_BASE_URL:-http://localhost:8000}"
BASE="${BASE%/}"

echo "Smoke testing API at ${BASE}"

curl -fsSL "${BASE}/health" | grep -q '"status"'
echo "  /health OK"

curl -fsSL "${BASE}/ready" | grep -q '"status"'
echo "  /ready OK"

curl -fsSL "${BASE}/openapi.json" | head -c 80 >/dev/null
echo "  /openapi.json OK"

curl -fsSL "${BASE}/billing/plans" | grep -q '"name"'
echo "  /billing/plans OK"

curl -fsSL "${BASE}/metrics" | head -c 40 >/dev/null
echo "  /metrics OK"

echo "API smoke test passed."
