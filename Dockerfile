# RedwoodJS 8 production image: build once, then serve web and api.

FROM node:20-bookworm-slim AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV YARN_CACHE_FOLDER=/tmp/yarn-cache

RUN corepack enable && corepack prepare yarn@4.6.0 --activate

FROM base AS deps

COPY package.json yarn.lock .yarnrc.yml ./
COPY api/package.json api/
COPY web/package.json web/

RUN yarn install --immutable

FROM deps AS builder

COPY . .

RUN rm -rf web/dist api/dist .redwood \
  && yarn rw prisma generate \
  && yarn rw build

FROM base AS runner

ENV NODE_ENV=production

COPY --from=builder /app /app

WORKDIR /app

RUN chown -R node:node /app

USER node

EXPOSE 8910 8911

CMD ["yarn", "rw", "serve", \
  "--web-host", "0.0.0.0", \
  "--api-host", "0.0.0.0", \
  "--web-port", "8910", \
  "--api-port", "8911"]
