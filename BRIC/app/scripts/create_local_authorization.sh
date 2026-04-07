#!/usr/bin/env bash
set -euo pipefail

# Create local authorization artifacts only when needed.
# - .local_auth.json: stores token metadata
# - .env.local: stores LOCAL_AUTH_TOKEN and HTTPS envs

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AUTH_JSON="${ROOT_DIR}/.local_auth.json"
ENV_FILE="${ROOT_DIR}/.env.local"

FORCE="false"
if [[ "${1:-}" == "--force" ]]; then
  FORCE="true"
fi

if [[ -f "${AUTH_JSON}" && "${FORCE}" != "true" ]]; then
  echo "[skip] ${AUTH_JSON} already exists (use --force to regenerate)."
  exit 0
fi

if command -v openssl >/dev/null 2>&1; then
  TOKEN="$(openssl rand -hex 32)"
else
  # Fallback: /dev/urandom + hexdump
  TOKEN="$(head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n')"
fi

CREATED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

cat > "${AUTH_JSON}" <<JSON
{
  "enabled": true,
  "issuer": "local",
  "created_at_utc": "${CREATED_AT}",
  "token": "${TOKEN}"
}
JSON

chmod 600 "${AUTH_JSON}" || true

if [[ -f "${ENV_FILE}" ]]; then
  if rg -n '^LOCAL_AUTH_TOKEN=' "${ENV_FILE}" >/dev/null 2>&1; then
    sed -i "s|^LOCAL_AUTH_TOKEN=.*$|LOCAL_AUTH_TOKEN=${TOKEN}|" "${ENV_FILE}"
  else
    printf '\nLOCAL_AUTH_TOKEN=%s\n' "${TOKEN}" >> "${ENV_FILE}"
  fi
else
  cat > "${ENV_FILE}" <<ENV
LOCAL_AUTH_TOKEN=${TOKEN}
ENV
fi

# Ensure HTTPS-related envs exist in .env.local.
if rg -n '^BRIC_SSL_MODE=' "${ENV_FILE}" >/dev/null 2>&1; then
  sed -i 's|^BRIC_SSL_MODE=.*$|BRIC_SSL_MODE=on|' "${ENV_FILE}"
else
  printf 'BRIC_SSL_MODE=on\n' >> "${ENV_FILE}"
fi

if ! rg -n '^BRIC_SSL_CERT=' "${ENV_FILE}" >/dev/null 2>&1; then
  printf 'BRIC_SSL_CERT=\n' >> "${ENV_FILE}"
fi

if ! rg -n '^BRIC_SSL_KEY=' "${ENV_FILE}" >/dev/null 2>&1; then
  printf 'BRIC_SSL_KEY=\n' >> "${ENV_FILE}"
fi

chmod 600 "${ENV_FILE}" || true

echo "[ok] Created ${AUTH_JSON}"
echo "[ok] Updated ${ENV_FILE}"
