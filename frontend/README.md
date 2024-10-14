# Basegun Vue.js frontend

## How to run ?

```bash
npm install
npm run start
```

## Test project

Run end-to-end tests with cypress. You need first to have installed dependancies with `npm ci`.

First run website with Docker then

```bash
# run in headless mode (only in terminal)
npm --prefix frontend run test:e2e-run

# run with graphical interface
npm --prefix frontend run test:e2e-open
```
