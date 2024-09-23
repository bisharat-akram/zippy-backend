ARG BASE=node:18
FROM ${BASE} AS dependencies

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn install
RUN npx prisma generate

COPY . ./

CMD ["yarn", "start:dev"]
