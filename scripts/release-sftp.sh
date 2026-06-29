#!/usr/bin/env bash
set -euo pipefail

HOST="${LEFIN_SFTP_HOST:-161.189.5.168}"
REMOTE_DIR="${LEFIN_SFTP_REMOTE_DIR:-/var/local/www}"
PORT="${LEFIN_SFTP_PORT:-22}"
LOCAL_DIR="${LEFIN_RELEASE_DIR:-dist}"
USER_NAME="${LEFIN_SFTP_USER:-${SFTP_USER:-ubuntu}}"
IDENTITY_FILE="${LEFIN_SFTP_KEY:-${SFTP_KEY:-}}"
STRICT_HOST_KEY_CHECKING="${LEFIN_SFTP_STRICT_HOST_KEY_CHECKING:-accept-new}"

if [[ ! -d "${LOCAL_DIR}" ]]; then
  echo "Local release directory not found: ${LOCAL_DIR}" >&2
  echo "Run npm run build first, or use npm run release." >&2
  exit 1
fi

if ! command -v sftp >/dev/null 2>&1; then
  echo "sftp command not found. Install OpenSSH client before releasing." >&2
  exit 1
fi

SFTP_OPTIONS=(
  -P "${PORT}"
  -o "StrictHostKeyChecking=${STRICT_HOST_KEY_CHECKING}"
)

if [[ -n "${IDENTITY_FILE}" ]]; then
  SFTP_OPTIONS+=(-i "${IDENTITY_FILE}")
fi

BATCH_FILE="$(mktemp)"
trap 'rm -f "${BATCH_FILE}"' EXIT

{
  printf -- '-mkdir %s\n' "${REMOTE_DIR}"
  printf 'cd %s\n' "${REMOTE_DIR}"
  printf 'lcd %s\n' "${LOCAL_DIR}"
  printf 'put -r *\n'
} > "${BATCH_FILE}"

echo "Uploading ${LOCAL_DIR}/ to ${USER_NAME}@${HOST}:${REMOTE_DIR}"
sftp "${SFTP_OPTIONS[@]}" -b "${BATCH_FILE}" "${USER_NAME}@${HOST}"
echo "Release upload finished."
