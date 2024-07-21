# Dockerfile for Expo (mobile)
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 8081  

CMD ["npm", "start"]