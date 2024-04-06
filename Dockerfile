FROM node:18-alpine

RUN mkdir app

WORKDIR app

COPY package*.json ./

RUN npm ci

COPY . ./

ENV HOST=0.0.0.0

RUN npm run build

CMD ["node", "dist/index.js"]
