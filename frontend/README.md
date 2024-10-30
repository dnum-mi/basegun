# Basegun Vue.js frontend

## How to run ?

```bash
npm install
npm run start
```

## How to run automated tests ?

1. Make sure the bakend stack is running by running `docker compose up -d` in the backend folder.
2. Make sure all the dependencies are installed by running `npm install` in the frontend folder.
3. Make sure the frontend is running : `npm run start`

```bash
npm run test:e2e-ci
```

## How to check code coverage ?

Open ./frontend/coverage/lcov-report/index.html or run `npx nyc report`

## Where to find all availables commands ?

`./frontend/package.json`
