# Stage 1: builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate
COPY src ./src

# Stage 2: runtime
FROM node:18-alpine AS runtime
WORKDIR /app
# chỉ cài production deps
COPY package.json package-lock.json ./
RUN npm ci --production
# copy Prisma Client đã generate từ builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
# copy phần code
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=4002
EXPOSE 4002
CMD ["node", "src/server.js"]
