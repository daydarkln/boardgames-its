#!/usr/bin/env bash

set -euo pipefail

docker compose -f "${COMPOSE_FILE_PATH:?COMPOSE_FILE_PATH is required}" \
  run --rm app yarn rw prisma migrate deploy

docker compose -f "${COMPOSE_FILE_PATH:?COMPOSE_FILE_PATH is required}" \
  run --rm app yarn rw exec importRostovVenues
