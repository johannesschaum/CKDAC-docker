FROM node:lts-alpine

RUN apk --no-cache add openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

ENV USER=node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=development

USER "${USER}"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN mkdir -p /home/node/app/bin/

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./


RUN npm config set unsafe-perm true
RUN npm init -y

RUN npm install

COPY --chown=node:node ./src/ ./src/
COPY --chown=node:node ./assets/. ./assets/
COPY --chown=node:node tsconfig.json ./

RUN npm run build

WORKDIR /home/node/app/bin/

EXPOSE 8080

CMD node Service.js