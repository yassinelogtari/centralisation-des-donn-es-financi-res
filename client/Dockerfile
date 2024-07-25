# Stage 1: Build the Angular application
FROM node:latest as builder

RUN mkdir  -p /app
WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build --prod


CMD ["npm", "start"]
