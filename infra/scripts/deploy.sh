#!/bin/bash
set -e -o pipefail
export APP_URL="https://github.com/${ORG}/${APP_NAME}/archive/refs/heads/${APP_BRANCH}.tar.gz"
export USER=$(lsb_release -si | tr [:upper:] [:lower:])

cd /home/$USER && mkdir -p ${APP_NAME} && curl -kLs $APP_URL \
| tar -zxvf - --strip-components=1 -C ${APP_NAME}

(
  cd ${APP_NAME}
  make up-https
  make CONTINUE=y TAG=${VERSION} PROD_PORT=8080 X_OVH_TOKEN=${X_OVH_TOKEN} API_OVH_TOKEN=${API_OVH_TOKEN} deploy-prod
)
exit $?