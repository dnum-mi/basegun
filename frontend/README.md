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
If you are in a network blocked with proxy, remember to add `--build_arg http_proxy --build-arg https_proxy` where `http_proxy, https_proxy` are variables already set in your env.



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


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
