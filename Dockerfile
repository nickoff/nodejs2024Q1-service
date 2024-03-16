FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm cache clean --force

COPY . .

CMD [ "npm", "run", "start:dev" ]