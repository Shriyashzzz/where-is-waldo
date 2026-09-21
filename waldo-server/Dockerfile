# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code and prisma config
COPY src ./src
COPY prisma ./prisma
COPY prisma7.config.ts ./
COPY tsconfig.json ./

# Generate Prisma client (with dummy database URL)
RUN DATABASE_URL="postgresql://dummy" npx prisma generate

# Build TypeScript
RUN npm run build

# Runtime stage
FROM node:22-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built application and dependencies from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/generated ./generated
COPY prisma ./prisma

# Expose port
EXPOSE 8000
ENV NODE_ENV=PROD

# Run application
CMD ["node", "dist/src/server.js"]