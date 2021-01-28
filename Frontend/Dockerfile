FROM node:lts-alpine AS build

ENV USER=node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=development

USER "${USER}"

COPY --chown=node:node package*.json /usr/angular-workdir/

WORKDIR /usr/angular-workdir

RUN npm config set unsafe-perm true
RUN npm init -y
RUN npm install

COPY --chown=node:node ./ /usr/angular-workdir

RUN npm run build -- --prod

#--------------------------------------


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build  /usr/angular-workdir/public /usr/share/nginx/html

EXPOSE 8080

CMD /bin/sh  -c envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js \
    && exec nginx -g 'daemon off;'
