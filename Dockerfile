FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --legacy-peer-deps
RUN npm cache clean --force

COPY . .

CMD [ "npm", "run", "start:service" ]