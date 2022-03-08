# Basegun

Inspirations:
- https://testdriven.io/blog/developing-a-single-page-app-with-fastapi-and-vuejs/
- https://medium.com/bb-tutorials-and-thoughts/how-to-serve-vue-js-application-with-nginx-and-docker-d8a872a02ea8

License from https://github.com/etalab/code.etalab.gouv.fr/blob/master/LICENSE


### Install
Install make on your environment then
```bash
# install in dev mode
make build-dev

# install for prod
make build-prod
```

### Launch the website
```bash
# run in dev mode
make up-dev

# run in pre-prod (test prod mode on localhost)
make up-preprod

# run in prod
make up-prod

# stop in dev
make down-dev
# stop in prod
make down-prod
```

# Release an official version of code
1. Update tag in Makefile
2. `make tag`
This will create a draft release in github (to validate) and some docker image packages with this tag.