FROM node:latest

WORKDIR /frontend

COPY package*.json ./


RUN npm install
COPY . .

RUN npm run build
CMD [ "npm", "start" ] 