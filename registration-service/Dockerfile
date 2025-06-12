# registration-service/Dockerfile
FROM node:20-alpine
WORKDIR /usr/src/registration-service
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4003
CMD ["node", "index.js"]