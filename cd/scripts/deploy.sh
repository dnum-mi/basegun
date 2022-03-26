#!/bin/bash

set -e -o pipefail

export APP_NAME="${APP_NAME:-basegun}"
export APP_BRANCH="${APP_BRANCH:-main}"
export ORG="${ORG:-datalab-mi}"
export APP_URL="https://github.com/${ORG}/${APP_NAME}/archive/refs/heads/${APP_BRANCH}.tar.gz"

# if authenticated repo
if [ -n "${GITHUB_TOKEN}" ] ; then
  curl_args=" -H \"Authorization: token ${GITHUB_TOKEN}\" "
fi

mkdir -p ${APP_NAME}
curl -kLs ${curl_args} ${APP_URL} |
tar -zxvf - --strip-components=1 -C ${APP_NAME}

(
  cd ${APP_NAME}
  make deploy
)
exit $?