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
### Install

Dependancies:
* make
* docker
* docker-compose

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

# run in pre-prod (test prod mode on localhost)
make up-preprod

# run in prod
make up-prod

# stop in dev
make down-dev
# stop in prod/preprod
make down-prod
```
If you have an error "Model missing" when uploading a photo, please refer to [backend README](https://github.com/datalab-mi/Basegun/blob/main/backend/README.md).

## Release an official version of code
1. Update tag in Makefile
2. `make tag`
This will create a draft release in github (to validate) and some docker image packages with this tag.
> If you made a tagging error, run `make untag`. This will delete the tag locally and in the remote.

## Inspirations
- https://testdriven.io/blog/developing-a-single-page-app-with-fastapi-and-vuejs/
- https://medium.com/bb-tutorials-and-thoughts/how-to-serve-vue-js-application-with-nginx-and-docker-d8a872a02ea8

License from [ETALAB](https://github.com/etalab/code.etalab.gouv.fr/blob/master/LICENSE)