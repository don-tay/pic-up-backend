# Pic-Up Backend

Upload, manage and share your images!

## Local dev setup

Steps:

1. Install dependencies: `npm install`
2. Set up env file (see below)
3. Run infra: `docker compose up`
4. Run DB migration: `npm run local:migrate`
5. Run the app (see below)

### Set up env file

Create a `envs/local.env` file with the appropriate env vars for local development.

## Running the app

```bash
# local development
$ npm run local # run in watch mode with NODE_ENV=local

# run build and start
$ npm run build
$ NODE_ENV=production npm run start # set NODE_ENV accordingly
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## DB Migration

Migrations are managed using TypeORM CLI

```bash
$ npm run typeorm:create-migration --name=<migration-name> # create migration
```
