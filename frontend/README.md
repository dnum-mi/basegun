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
docker build -t basegun:front .
```
If you are in a network blocked with proxy, remember to add arg `--build-arg https_proxy=http://username:passwd@proxy-ip:port`


## Run project
### Without Docker
```bash
npm run serve
```

### With Docker
```bash
docker run --rm -p 8080:8080 -d basegun:front
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
