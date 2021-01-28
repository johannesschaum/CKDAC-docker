FROM node:lts-alpine

ENV USER=node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=development

USER "${USER}"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm config set unsafe-perm true
RUN npm init -y

RUN npm install

COPY --chown=node:node ./src/ ./src/
COPY --chown=node:node ./tls/ ./tls/
COPY --chown=node:node tsconfig.json ./

RUN npm run build

WORKDIR /home/node/app/bin/

CMD node Service.js