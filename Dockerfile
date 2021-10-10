FROM node:16-alpine AS base

WORKDIR /src

COPY package.json .
RUN npm install

COPY . .
RUN npm run build:server:prod
RUN npm run build:client

# ----------------

FROM node:16-alpine

WORKDIR /src

COPY package.json ./

COPY --from=base /src/dist ./dist
COPY --from=base /src/node_modules ./node_modules

RUN adduser -D user
USER user

EXPOSE 3000

CMD npm run start:server

