#!/usr/bin/env bash

set -euo pipefail

url="${1:?URL is required}"
timeout_seconds="${2:-120}"
interval_seconds="${3:-2}"
deadline=$((SECONDS + timeout_seconds))

while ((SECONDS < deadline)); do
  if curl --fail --silent --show-error "$url" >/dev/null; then
    exit 0
  fi

  sleep "$interval_seconds"
done

echo "Timed out waiting for ${url}" >&2
exit 1
