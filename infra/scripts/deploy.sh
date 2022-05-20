#!/bin/bash
set -e -o pipefail

export ENV = ${jsondecode(ENVIRONMENT)}
export TEST = ENV.APP_BRANCH
%{ for name_var, value_var in ENV }
export ${name_var}=${value_var}
%{ endfor ~}
export APP_NAME="basegun"
export APP_URL="https://github.com/datalab-mi/${APP_NAME}/archive/refs/heads/${APP_BRANCH}.tar.gz"
export USER=$(lsb_release -si | tr [:upper:] [:lower:])

su $USER
cd /home/$USER && mkdir -p ${APP_NAME} && curl -kLs $APP_URL \
| tar -zxvf - --strip-components=1 -C ${APP_NAME}

(
  cd ${APP_NAME}
  make start-https
  make CONTINUE=y TAG=${APP_VERSION} deploy-prod
)
exit $?