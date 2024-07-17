SHELL	:= /bin/bash
DOCKER	:= $(shell type -p docker)
DC		:= ${DOCKER} compose
TAG		:= 4.0.0
APP_NAME	:= basegun
REG		:= ghcr.io
ORG		:= dnum-mi

export

show-current-tag:
	@while [ -z "$$CONTINUE" ]; do \
		read -r -p "Current tag is ${TAG}. Continue? [y/N]: " CONTINUE; \
	done ; \
	[ $$CONTINUE = "y" ] || [ $$CONTINUE = "Y" ] || (echo "Exiting."; exit 1;)

get-current-tag:
	@echo ${TAG}

check-prerequisites:
ifeq ("$(wildcard ${DOCKER})","")
	@echo "docker not found" ; exit 1
endif
ifeq ("$(wildcard ${DC})","")
	@echo "docker-compose not found" ; exit 1
endif

check-dc-config-%: check-prerequisites ## Check docker-compose syntax
	${DC} config -q

build: check-dc-config-%
	${DC} build

up: check-dc-config-%
	${DC} up -d

down:
	${DC} down

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
	docker tag basegun-frontend:${TAG}-prod ghcr.io/dnum-mi/basegun/basegun-frontend:$*
	docker tag basegun-backend:${TAG}-prod ghcr.io/dnum-mi/basegun/basegun-backend:$*
	docker push ghcr.io/dnum-mi/basegun/basegun-frontend:$*
	docker push ghcr.io/dnum-mi/basegun/basegun-backend:$*

deploy-prod: pull up-prod
