#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
release_dir="${RELEASE_DIR:-$(cd "${script_dir}/../.." && pwd)}"
project_env="${PROJECT_ENV_FILE:-${release_dir}/deploy/project.env}"

if [[ -f "$project_env" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$project_env"
  set +a
fi

app_name="${APP_NAME:-$(basename "$release_dir")}"
app_root="${APP_ROOT:-/opt/${app_name}}"
release_sha="${RELEASE_SHA:?RELEASE_SHA is required}"
current_link="${CURRENT_LINK:-${app_root}/current}"
keep_releases="${KEEP_RELEASES:-5}"
compose_file="${COMPOSE_FILE:-deploy/docker-compose.prod.yml}"
hooks_dir="${HOOKS_DIR:-${release_dir}/deploy/hooks}"
wait_script="${WAIT_SCRIPT:-${release_dir}/deploy/scripts/wait-for-url.sh}"
healthcheck_urls="${HEALTHCHECK_URLS:-}"
healthcheck_timeout="${HEALTHCHECK_TIMEOUT:-120}"
healthcheck_interval="${HEALTHCHECK_INTERVAL:-2}"

if [[ "$compose_file" == /* ]]; then
  compose_file_path="$compose_file"
else
  compose_file_path="${release_dir}/${compose_file}"
fi

run_root() {
  if ((EUID == 0)); then
    "$@"
    return
  fi

  if command -v sudo >/dev/null 2>&1; then
    sudo "$@"
    return
  fi

  echo "Root privileges are required for: $*" >&2
  exit 1
}

require_file() {
  local path="$1"

  if [[ ! -f "$path" ]]; then
    echo "Required file is missing: $path" >&2
    exit 1
  fi
}

run_hook() {
  local name="$1"
  local path="${hooks_dir}/${name}"

  if [[ ! -f "$path" ]]; then
    return 0
  fi

  echo "Running deploy hook: ${name}"
  if [[ -x "$path" ]]; then
    "$path"
  else
    /bin/bash "$path"
  fi
}

compose_logs_on_failure() {
  echo "Docker Compose status:" >&2
  docker compose -f "$compose_file_path" ps -a >&2 || true
  echo "Recent Docker Compose logs:" >&2
  docker compose -f "$compose_file_path" logs --tail 200 >&2 || true
}

cleanup_old_releases() {
  local releases_dir="${app_root}/releases"
  local keep_count="$1"

  if ! [[ "$keep_count" =~ ^[0-9]+$ ]]; then
    echo "KEEP_RELEASES must be a non-negative integer, got: ${keep_count}" >&2
    exit 1
  fi

  mapfile -t old_releases < <(
    find "$releases_dir" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
      | sort -nr \
      | awk -v keep="$keep_count" 'NR > keep { print $2 }'
  )

  if ((${#old_releases[@]} == 0)); then
    return 0
  fi

  for old_release in "${old_releases[@]}"; do
    rm -rf "$old_release"
  done
}

select_nginx_config() {
  local selected=""

  if [[ -n "${NGINX_SITE_NAME:-}" ]]; then
    selected="${release_dir}/deploy/nginx/${NGINX_SITE_NAME}"
    if [[ -f "$selected" ]]; then
      printf '%s\n' "$selected"
      return 0
    fi

    echo "NGINX_SITE_NAME is set but config is missing: ${selected}" >&2
    exit 1
  fi

  shopt -s nullglob
  local configs=("${release_dir}"/deploy/nginx/*.conf)
  shopt -u nullglob

  if ((${#configs[@]} == 1)); then
    printf '%s\n' "${configs[0]}"
  fi
}

install_nginx_config() {
  local selected_conf
  selected_conf="$(select_nginx_config)"

  if [[ -z "$selected_conf" ]]; then
    echo "No Nginx config selected; skipping Nginx reload."
    return 0
  fi

  command -v nginx >/dev/null
  command -v systemctl >/dev/null

  local site_name="${NGINX_SITE_NAME:-$(basename "$selected_conf")}"
  local current_conf="${current_link}/deploy/nginx/$(basename "$selected_conf")"
  local nginx_available="/etc/nginx/sites-available/${site_name}"
  local nginx_enabled="/etc/nginx/sites-enabled/${site_name}"

  run_root ln -sfn "$current_conf" "$nginx_available"
  run_root ln -sfn "$nginx_available" "$nginx_enabled"
  run_root nginx -t
  run_root systemctl reload nginx
}

require_file "$compose_file_path"
require_file "$wait_script"
command -v docker >/dev/null
command -v curl >/dev/null
docker compose version >/dev/null

mkdir -p "${app_root}/releases"

export APP_NAME="$app_name"
export APP_ROOT="$app_root"
export RELEASE_SHA="$release_sha"
export RELEASE_DIR="$release_dir"
export CURRENT_LINK="$current_link"
export IMAGE_TAG="${IMAGE_TAG:-$release_sha}"
export COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-$app_name}"
export COMPOSE_FILE_PATH="$compose_file_path"

run_hook "validate-env.sh"

if [[ "${GHCR_LOGIN:-1}" != "0" ]]; then
  : "${GHCR_TOKEN:?GHCR_TOKEN is required unless GHCR_LOGIN=0}"
  printf '%s\n' "$GHCR_TOKEN" \
    | docker login ghcr.io -u "${GHCR_USERNAME:-x-access-token}" --password-stdin >/dev/null
fi

docker compose -f "$compose_file_path" config >/dev/null
docker compose -f "$compose_file_path" pull
docker compose -f "$compose_file_path" up -d --remove-orphans

run_hook "post-up-pre-health.sh"

if [[ -n "$healthcheck_urls" ]]; then
  read -r -a urls <<< "$healthcheck_urls"
  for url in "${urls[@]}"; do
    echo "Waiting for health check: ${url}"
    if ! "$wait_script" "$url" "$healthcheck_timeout" "$healthcheck_interval"; then
      compose_logs_on_failure
      exit 1
    fi
  done
else
  echo "HEALTHCHECK_URLS is empty; skipping health checks."
fi

ln -sfn "$release_dir" "$current_link"
install_nginx_config
run_hook "post-health.sh"
cleanup_old_releases "$keep_releases"

echo "Release ${release_sha} deployed successfully for ${app_name}."
