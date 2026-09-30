# ---- Build ----
FROM oven/bun:1-alpine AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile
COPY . .
RUN bun run build

# ---- Runtime ----
FROM oven/bun:1-alpine
WORKDIR /app
# svelte-adapter-bun emits a self-contained build/ — no runtime node_modules
COPY --from=build --chown=bun:bun /app/build ./build
COPY --chown=bun:bun serve.js ./serve.js
USER bun
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0 ORIGIN=https://havbank.net \
    ADDRESS_HEADER=x-forwarded-for XFF_DEPTH=1 \
    PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ || exit 1
# --smol: smaller heap, more frequent GC (low-traffic site, capped at 256 MB)
CMD ["bun", "--smol", "serve.js"]
