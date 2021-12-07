# Basegun

Inspirations:
- https://github.com/testdrivenio/flask-vue-crud
- https://testdriven.io/blog/developing-a-single-page-app-with-fastapi-and-vuejs/

License from https://github.com/etalab/code.etalab.gouv.fr/blob/master/LICENSE

### Build environment
```bash
docker-compose -f docker-compose-dev.yml build
```
NB: in an environment with proxy, add at the end `--build-arg https_proxy=$https_proxy --build-arg http_proxy=$http_proxy`

### Run
```bash
# start
docker-compose -f docker-compose-dev.yml up -d

# stop server
docker-compose -f docker-compose-dev.yml down
```
