FROM node to read dockerfile: open Dockerfile: no such file:16-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

CMD ["node", "index.js"]
