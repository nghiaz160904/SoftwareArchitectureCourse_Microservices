# auth-service/Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/auth-service

COPY package*.json ./
RUN npm install

# Copy mã nguồn và Prisma schema
COPY . .

# Tạo Prisma Client
RUN npx prisma generate

# Trước khi start, chạy migration
CMD ["sh", "-c", "npx prisma db push && node index.js"]

