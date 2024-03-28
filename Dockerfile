FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --legacy-peer-deps
RUN npm cache clean --force

COPY . .

COPY init.sh .
RUN chmod +x init.sh

CMD [ "/bin/sh", "-c", "./init.sh" ]