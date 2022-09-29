# About

Simple shop system for small resellers

**NOTE: NOT READY FOR USAGE**

# Requirements

- PHP 8.1
- Composer
- Node.js
- NPM

# How to install

```bash
# Clone repo
git clone https://github.com/spectronp/shop.git
cd shop

# Install dependencies
composer install
npm install

# Set Laravel key
cp .env.testing .env
php artisan key:generate

# Set database
touch database/database.sqlite
php artisan migrate

# Compile JS
npm run dev # for development
# or
npm run prod # for production
```

# Running Tests

## Jest

```bash
npm test
```

## Laravel

```bash
php artisan test
```

## Cypress

```bash
# Open Cypress with the app on the background
npm run cypr:open

# Run Cypress in CLI with the app on the background
npm run cypr:run
```

# How to Launch ( development )

```bash
# Launch the app at localhost:8000
php artisan serve
```
