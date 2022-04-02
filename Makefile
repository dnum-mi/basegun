SHELL	:= /bin/bash
DOCKER	:= $(shell type -p docker)
DC		:= $(shell type -p docker-compose)
TAG		:= 1.1
APP_NAME    := basegun
REG     := ghcr.io
ORG     := datalab-mi


export

show-current-tag:
	@while [ -z "$$CONTINUE" ]; do \
		read -r -p "Current tag is v${TAG}. Continue? [y/N]: " CONTINUE; \
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

up-preprod: check-dc-config-prod show-current-tag
	PORT_PROD=3000 TAG=${TAG} ${DC} -f docker-compose-prod.yml up -d

up-%: check-dc-config-% show-current-tag
	TAG=${TAG} ${DC} -f docker-compose-$*.yml up -d

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

deploy-prod: pull up-prod