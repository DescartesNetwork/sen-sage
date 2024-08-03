FROM node:20.12.0-slim as base
WORKDIR /app
RUN npm install -g pnpm@8.15.6

# ===============================
# Builder
# ===============================
FROM base as build
# Install deps
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
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000
# Get source
COPY --from=build /app /app
# Config workspace
EXPOSE 3000
# Run server
CMD pnpm start
