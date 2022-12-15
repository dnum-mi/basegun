SHELL	:= /bin/bash
DOCKER	:= $(shell type -p docker)
DC		:= $(shell type -p docker-compose)
TAG		:= 2.0
APP_NAME	:= basegun
REG		:= ghcr.io
ORG		:= datalab-mi


export

show-current-tag:
	@while [ -z "$$CONTINUE" ]; do \
		read -r -p "Current tag is ${TAG}. Continue? [y/N]: " CONTINUE; \
	done ; \
	[ $$CONTINUE = "y" ] || [ $$CONTINUE = "Y" ] || (echo "Exiting."; exit 1;)

check-prerequisites:
ifeq ("$(wildcard ${DOCKER})","")
	@echo "docker not found" ; exit 1
endif
ifeq ("$(wildcard ${DC})","")
	@echo "docker-compose not found" ; exit 1
endif

check-dc-config-%: check-prerequisites ## Check docker-compose syntax
	${DC} -f docker-compose-$*.yml config -q

build-%: check-dc-config-% show-current-tag
	TAG=${TAG} ${DC} -f docker-compose-$*.yml build

up-%: check-dc-config-% show-current-tag
ifeq ("$(WORKSPACE)","preprod")
	TAG=${TAG} PORT_PROD=8080 ${DC} -f docker-compose-$*.yml up -d
else
	TAG=${TAG} ${DC} -f docker-compose-$*.yml up -d
endif

test-workflow-%:
	BUILD_TARGET=test TAG=${TAG} ${DC} -f docker-compose-dev.yml build $*
	${DC} -f docker-compose-dev.yml up -d $*
	sleep 10

test-backend: test-workflow-backend
	docker exec basegun-backend python -m unittest discover -v

test-frontend: test-workflow-frontend
	curl -s -o /dev/null localhost:3000

down-%:
	${DC} -f docker-compose-$*.yml down

tag: show-current-tag
	git tag -a v${TAG}
	git push origin v${TAG}

untag: show-current-tag
	git tag -d v${TAG}
	git push --delete origin v${TAG}

pull: pull-backend pull-frontend

pull-%:
	docker pull ${REG}/${ORG}/${APP_NAME}/${APP_NAME}-$*:${TAG}
	docker tag ${REG}/${ORG}/${APP_NAME}/${APP_NAME}-$*:${TAG} ${APP_NAME}-$*:${TAG}-prod

push: push-${TAG}

push-%:
	docker tag basegun-frontend:${TAG}-prod ghcr.io/datalab-mi/basegun/basegun-frontend:$*
	docker tag basegun-backend:${TAG}-prod ghcr.io/datalab-mi/basegun/basegun-backend:$*
	docker push ghcr.io/datalab-mi/basegun/basegun-frontend:$*
	docker push ghcr.io/datalab-mi/basegun/basegun-backend:$*

deploy-prod: pull up-prod

start-https:
	touch infra/traefik/acme.json
	sudo chmod 600 infra/traefik/acme.json
	${DC} -f infra/traefik/docker-compose.yml up -d
