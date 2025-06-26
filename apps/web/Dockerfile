FROM node:22-alpine as base

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

COPY . .

RUN npm i

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

CMD ["npm", "run", "start"]