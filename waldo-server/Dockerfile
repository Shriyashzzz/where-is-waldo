# syntax=docker/dockerfile:1

# ---- Base image ----
FROM node:22-alpine AS base
WORKDIR /app
# openssl is required by Prisma's query engine on alpine
RUN apk add --no-cache openssl

# ---- Install all dependencies (incl. dev, needed for build) ----
FROM base AS deps
COPY package*.json ./
RUN npm ci

# ---- Build ----
FROM deps AS build
# `prisma generate` only needs DATABASE_URL to be present/parseable at
# config-load time — it doesn't connect to a real database during generate.
# The real value is supplied at runtime via docker-compose.
ARG DATABASE_URL="postgresql://user:password@localhost:5432/db"
ENV DATABASE_URL=${DATABASE_URL}
ARG REDIS_URL="redis://localhost:6379"
ENV REDIS_URL=${REDIS_URL}
COPY . .
# Generate the Prisma client against your schema
RUN npx prisma generate
# Compile TypeScript -> dist/
RUN npm run build
# Drop devDependencies now that build artifacts exist
RUN npm prune --omit=dev

# ---- Production runtime ----
FROM base AS production
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package*.json ./

EXPOSE 8080

CMD ["node", "dist/src/server.js"]