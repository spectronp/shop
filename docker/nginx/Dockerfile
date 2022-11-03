FROM node:lts-alpine AS node
COPY . /tmp/shop
WORKDIR /tmp/shop
RUN npm ci
RUN npm run prod
RUN rm -rf babel.config.js \
    compose.yaml \
    .env.dev \
    .env.testing \
    cypress.config.js \
    docker \
    node_modules \
    phpunit.xml \
    tailwind.config.js \
    tests \
    webpack.mix.js

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/site.conf /etc/nginx/conf.d/
COPY --from=node /tmp/shop /srv/shop
