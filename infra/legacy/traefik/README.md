# HTTPS for preprod

We use Traefik to have https on preprod server.  
It also acts as a reverse proxy, therefore the traefik docker image is plugged on port 80 and 443 and redirects to 8080, while the website frontend is plugged on port 8080 (see [deploy.sh](https://github.com/datalab-mi/Basegun/blob/develop/infra/scripts/deploy.sh))

This folder contains all the configuration necessary for Traefik to work.  
See [the documentation](https://doc.traefik.io/traefik/https/acme/) for more details.
Big thanks to [Thierry](https://github.com/titigmr) for his help on this part.

> /!\ WARNING the ` docker-compose.yml` from this folder is supposed to be lauched from the root dir Basegun (via ` make start-https`), therefore the paths for the mounts are expressed this way.