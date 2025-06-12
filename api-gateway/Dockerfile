# api-gateway/Dockerfile
FROM node:20-alpine
WORKDIR /usr/src/api-gateway
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
CMD ["node", "api-gateway.js"]