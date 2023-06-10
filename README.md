# Pic-Up Backend

Upload, manage and share your images!

## Local dev setup

Steps:

1. Install dependencies: `npm install`
2. Set up env file (see below)
3. Run infra: `docker compose up`
4. Run the app (see below)

### Set up env file

Create a `envs/local.env` file with the appropriate env vars for local development.

## Running the app

```bash
# local development
$ npm run local # run in watch mode with NODE_ENV=local

# run build and start (for production)
$ npm run build
$ NODE_ENV=production npm run start # set NODE_ENV and run
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

$ NODE_ENV=local npm run typeorm:run-migration # run migrations (set NODE_ENV accordingly)

$ NODE_ENV=local npm run typeorm:revert-migration # revert migrations (set NODE_ENV accordingly)
```
