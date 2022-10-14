# Basegun

## Project context
According to DCPJ (French Police forces), over 7000 firearms are seized each year, 15 to 20% of which are misidentified or unidentified.
This leads to errors in the legal classification of weapons and has the following consequences:
* A lack of criminal prosecution, or conversely, unjustified prosecution
* Over-solicitation of firearms experts
* Erroneous sales of weapons subject to authorization by civilian gunsmiths


**Project summary**  
Develop an app for the law enforcement forces where they just need to take a photo of a firearm to obtain an identification result.

**History of the product:**
* 2021/09/13: the Direction of Numeric of French Ministy of the Interior hires two members of [Entrepreneurs d'Intérêt Général (EIG) Program](https://eig.etalab.gouv.fr/defis/basegun/) to develop a Minimum Viable Product for 10 months.
* 2022/07/13: end of EIG program.

## Technical details

### Requirements
Dependancies:
* make
* docker
* docker-compose

See also [Debugging](https://github.com/datalab-mi/Basegun/blob/develop/backend/README.md#debugging) section for all the env variables needed for the website to work fully operationally.
### Install

```bash
# install in dev mode
make build-dev

# install for prod/preprod
make build-prod
```

### Launch the website
```bash
# run in dev mode
make up-dev

# run prod mode on localhost
WORKSPACE=preprod make up-prod

# run in prod
make up-prod

# stop in dev
make down-dev
# stop in prod/preprod
make down-prod
```
## Debugging

### There is an error to connect to the internet at build
If your network uses a proxy, you must have set variables `http_proxy`, `https_proxy`and `no_proxy` in your environment.
If your network imposes you to use a custom certicifate (error "SSL" at build), then:
1. copy your certificate `my-cert.pem` in each `cert/` folder in frontend and backend.
2. set a variable `CACERT_LOCATION=/etc/ssl/certs/my-cert.pem` in your env

### The website sends an error
Try to find error log
* In terminal, run `docker logs basegun-backend`
* If you cannot access terminal or don't see anything, go to `localhost:5000/logs` or `preprod.basegun.fr/logs` to see latest logs.

=> Error "missing model": Download model from the url specified in the [backend Dockerfile](https://github.com/datalab-mi/Basegun/blob/develop/backend/Dockerfile).

### The website runs the analysis, but no image shows up
Use browser html inspector to find the url given in the image src.
* If it starts with `https://storage.gra.cloud.ovh.net` then the website tried to upload the input image to OVH but it failed. Have you set properly in your env the variables OS_USERNAME, OS_PASSWORD and OS_PROJECT ?
* If it starts with `https://localhost` then the website tried to store the input image locally. Have you synchronised the mounts for frontend and backend in [docker-compose-dev](https://github.com/datalab-mi/Basegun/blob/develop/backend/docker-compose-dev.yml) ? (uncomment the `/tmp/basegun` lines in the volumes sections)

### Logs are not sent to the endpoint
The variables `X_OVH_TOKEN` and `API_OVH_TOKEN` must en set in your env. See [Infra README](https://github.com/datalab-mi/Basegun/blob/develop/infra/README.md) for more details.

## Release an official version of code
1. Update tag in Makefile
2. `make tag`
This will create a draft release in github (to validate) and some docker image packages with this tag.
> If you made a tagging error, run `make untag`. This will delete the tag locally and in the remote.

## Inspirations
- https://testdriven.io/blog/developing-a-single-page-app-with-fastapi-and-vuejs/
- https://medium.com/bb-tutorials-and-thoughts/how-to-serve-vue-js-application-with-nginx-and-docker-d8a872a02ea8

License from [ETALAB](https://github.com/etalab/code.etalab.gouv.fr/blob/master/LICENSE)