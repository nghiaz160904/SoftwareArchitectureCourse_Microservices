# auth-service/Dockerfile
FROM node:20-alpine

# Thay auth-service thành đúng tên thư mục service của bạn
WORKDIR /usr/src/auth-service

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài dependencies (chỉ production)
RUN npm install --production

# Copy toàn bộ code của service
COPY . .

# Mở port tương ứng từng service
EXPOSE 4001

# Khởi động service
CMD ["node", "index.js"]