#!/usr/bin/env sh
set -eu

# Daily Postgres backup for Docker Compose stacks.
# Example cron: 0 2 * * * /opt/hiring-journey/backend/scripts/backup-db.sh

BACKUP_DIR="${BACKUP_DIR:-/var/backups/hiring-journey}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
ENV_FILE="${ENV_FILE:-.env.production}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUTPUT="${BACKUP_DIR}/hiring_journey_${TIMESTAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"

cd "$(dirname "$0")/.."

docker compose -f "${COMPOSE_FILE}" --env-file "${ENV_FILE}" exec -T db \
  pg_dump -U "${POSTGRES_USER:-hj}" "${POSTGRES_DB:-hiring_journey}" | gzip > "${OUTPUT}"

find "${BACKUP_DIR}" -name 'hiring_journey_*.sql.gz' -mtime +"${RETENTION_DAYS}" -delete

echo "Backup written to ${OUTPUT}"
