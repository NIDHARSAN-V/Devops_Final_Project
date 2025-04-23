# Use official Node.js LTS base image
FROM node:18-alpine

WORKDIR /node-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
