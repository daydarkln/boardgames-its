#!/usr/bin/env bash

set -euo pipefail

env_file="${ENV_FILE:-/opt/boardgames-its/shared/env/app.env}"

if [[ ! -f "$env_file" ]]; then
  echo "Required production env file is missing: ${env_file}" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$env_file"
set +a

required_names=(
  POSTGRES_DB
  POSTGRES_USER
  POSTGRES_PASSWORD
  DATABASE_URL
  SESSION_SECRET
)

for name in "${required_names[@]}"; do
  value="${!name:-}"

  if [[ -z "$value" || "$value" == replace-* ]]; then
    echo "Environment variable ${name} must be set to a real value before deploy." >&2
    exit 1
  fi
done
