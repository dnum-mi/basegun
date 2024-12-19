# Basegun

## Project context
According to the [French gun legislator](https://www.interieur.gouv.fr/ministere/organisation/secretariat-general/service-central-des-armes-et-explosifs), 20 000 firearms are seized each year in France, 15 to 20% of which are misidentified or unidentified.
This leads to errors in the legal classification of weapons and has the following consequences:
* A lack of criminal prosecution, or conversely, unjustified prosecution
* Over-solicitation of firearms experts
* Erroneous sales of weapons subject to authorization by civilian gunsmiths

**Project summary**  
Develop an app for the law enforcement forces where they just need to take a photo of a firearm to obtain an identification result.

**History of the product:**
* 2021/09/13: the Direction of Numeric of French Ministy of the Interior hires [a developer and a data scientist](https://eig.etalab.gouv.fr/defis/basegun/) to develop a Minimum Viable Product for 10 months.
* 2022/03: first prototype in production (basegun.fr)
* 2022/09: tests with real users from police and gendarmerie
* 2024/02: solution deployed to all professional mobile phones of gendarmerie forces in France on https://basegun.interieur.gouv.fr

## Technical Stack
[![Static Badge](https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)&nbsp;
[![Static Badge](https://img.shields.io/badge/FastAPI-009485?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)&nbsp;
[![forthebadge made-with-vue](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)&nbsp;
[![Static Badge](https://img.shields.io/badge/Python-FFDF76?style=for-the-badge&logo=python)](https://www.python.org/)&nbsp;
[![Static Badge](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)&nbsp;
[![Static Badge](https://img.shields.io/badge/Pinia-ffd859?style=for-the-badge)](https://pinia.vuejs.org/)&nbsp;
[![forthebadge made-with-vue](https://img.shields.io/badge/UnoCSS-CC6699?style=for-the-badge&logo=unocss)](https://vue-chartjs.org/)

### Linter
[![Generic badge](https://img.shields.io/badge/RUFF-4C4C4C?style=for-the-badge&logo=ruff)](https://github.com/astral-sh/ruff)&nbsp;
[![Generic badge](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)&nbsp;
[![Generic badge](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io/)

### DSFR (French State Design System)

[![Generic badge](https://img.shields.io/badge/Vue-DSFR-%23180880?style=for-the-badge&logo=vuedotjs&logoColor=white&labelColor=4FC08D)](https://vue-ds.fr/)

### Requirements
Dependancies :

[![Generic badge](https://img.shields.io/badge/PNPM-4C4C4C?style=for-the-badge&logo=pnpm)](https://pnpm.io/)&nbsp;

[![Generic badge](https://img.shields.io/badge/PIP-4C4C4C?style=for-the-badge&logo=pypi)](https://packaging.python.org/en/latest/tutorials/installing-packages/)&nbsp;

[![Generic badge](https://img.shields.io/badge/Make-4C4C4C?style=for-the-badge&logo=ankermake&logoColor=orange)](https://www.gnu.org/software/make/manual/make.html)&nbsp;

[![Generic badge](https://img.shields.io/badge/Docker-4C4C4C?style=for-the-badge&logo=docker)](https://www.docker.com/)&nbsp;

[![Generic badge](https://img.shields.io/badge/Docker-Compose-4C4C4C?style=for-the-badge&logo=docker)](https://docs.docker.com/compose/)&nbsp;

See also [Debugging](https://github.com/dnum-mi/Basegun/blob/develop/backend/README.md#debugging) section for all the env variables needed for the website to work fully operationally.

## Setup project for development

### Build containers

```bash
# install in dev mode
make build
```

### Launch containers
```bash
# run
make up

# stop
make down
```

### Setup frontend and launch using Vite
Use ``pnpm install`` on ``frontend`` folder

Use ``pnpm run start`` for start the website with Vite

### Lints and fixes files
Use ``pre-commit run --all-files`` for linting on frontend and backend folders


## Debugging

* If the interface of the website does not appear on ``http://localhost:5173``, there is an issue with frontend. In terminal, run `docker logs basegun-frontend`

* If the interface shows up properly but there is a bug at image upload, there is an issue with the backend. Try to find error log:
    * In terminal, run `docker logs basegun-backend`
    * If you cannot access terminal or don't see anything, go to `http://localhost:5000/logs` to see latest logs.

* Beside frontend and backend services, we use some containers in dev which simulate some services provided by our cloud provider: s3 storage, mail server... See our [infrastructure repo](https://github.com/dnum-mi/basegun-infra) for more info about app architecture.

## Testing the website like you were a police or gendarme user with Keycloak
1. Set your User Agent to 'SAID'
2. Go to ``http://localhost:5173/expert-contact``.
This will redirect you to a login page where you have two options :
* If you want to test the police path, use `police` as username and `password` as password.
* For the gendarmerie path, use `gendarmerie` as username and `password` as password.
(see [keyclock conf](https://github.com/dnum-mi/basegun/blob/develop/keycloak/realm-export.json))

## Release an official version of code
1. Update tag in Makefile
2. `make tag`
This will create a draft release in github (to validate) and some docker image packages with this tag.
> If you made a tagging error, run `make untag`. This will delete the tag locally and in the remote.

## Licence
Due to its usage of python library [Ultralytics](https://github.com/ultralytics/ultralytics/blob/main/LICENSE), BaseGun uses copyleft [GNU Affero General Public License v3.0 (AGPL-3.0)](https://www.data.gouv.fr/fr/pages/legal/licences/).