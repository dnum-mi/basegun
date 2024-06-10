# Basegun Vue.js frontend

## Project setup

### Without Docker

```bash
# install requirements
npm install

# Compiles and minifies for production
npm run build

# Lints and fixes files
npm run lint
```

### With Docker

```bash
docker build --target dev -t basegun-front:dev .
```

If you are in a network blocked with proxy, remember to add arg `--build_arg https_proxy` where `https_proxy` is a variable already set in your env.

## Run project

### Without Docker

```bash
npm run dev
```

Open localhost:3000

### With Docker

```bash
docker run --rm -p 3000:3000 -d basegun-front:dev
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

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
