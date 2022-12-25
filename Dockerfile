FROM node:16-alpine

EXPOSE 4000

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN corepack enable
RUN yarn install:prod
RUN yarn build

CMD ["yarn", "deploy"]
