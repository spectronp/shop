FROM composer AS composer
COPY . /tmp/shop
WORKDIR /tmp/shop
RUN composer install --optimize-autoloader --no-dev
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

FROM php:fpm-alpine
COPY --from=composer --chown=www-data:www-data /tmp/shop /srv/shop
WORKDIR /srv/shop
RUN sh -c "if [[ ! -e database/database.sqlite ]]; then touch database.sqlite; fi"
RUN chown www-data:www-data database/database.sqlite
RUN php artisan key:generate
RUN php artisan migrate --force
RUN php artisan scout:import "App\Models\Client"
RUN php artisan config:cache; \
    php artisan route:cache; \
    php artisan view:cache

