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
* 2024/02: solution deployed to all professional mobile phones of gendarmerie forces in France on basegun.interieur.gouv.fr

## Technical details

### Requirements
Dependancies:
* make
* docker
* docker-compose

See also [Debugging](https://github.com/dnum-mi/Basegun/blob/develop/backend/README.md#debugging) section for all the env variables needed for the website to work fully operationally.
### Install

```bash
# install in dev mode
make build
```

### Launch the website
```bash
# run
make up

# stop
make down
```

### Authentication

1. Login into keycloak
2. Go to the Basegun realm
3. Then in "Realm settings", go to "Keys"
4. Copy the RS256 public key and paste it in the docker compose.

## Debugging

* If the interface of the website does not appear on localhost:3000, there is an issue with frontend. In terminal, run `docker logs basegun-frontend`

* If the interface shows up properly but there is a bug at image upload, there is an issue with the backend. Try to find error log:
    * In terminal, run `docker logs basegun-backend`
    * If you cannot access terminal or don't see anything, go to `localhost:5000/logs` to see latest logs.

* Beside frontend and backend services, we use some containers in dev which simulate some services provided by our cloud provider: s3 storage, mail server... See our [infrastructure repo](https://github.com/dnum-mi/basegun-infra) for more info about app architecture.

## Testing the website like you were a police or gendarme user with Keycloak
1. Set your User Agent to 'SAID'
2. Click on the button 'Contacter un expert' on the result page or go to localhost:3000/expert-contact
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