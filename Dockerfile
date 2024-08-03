FROM node:20.12.0-slim as base

# ===============================
# Builder
# ===============================
FROM base as build
WORKDIR /app
# Install deps
RUN npm install -g pnpm@8.15.6
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
# Build source
COPY . .
RUN pnpm build
# Remove dev deps
RUN pnpm prune --prod

# ===============================
# Runner
# ===============================
FROM base as runner
WORKDIR /app
ENV NODE_ENV production
# Get source
COPY --from=build /app /app
# Config workspace
EXPOSE 3000
# Run server
CMD pnpm start
