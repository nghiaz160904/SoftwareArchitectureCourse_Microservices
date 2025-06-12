# client/Dockerfile
FROM node:20-alpine
WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# Vite dev server cần lắng nghe trên 0.0.0.0 để bên ngoài truy cập
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]