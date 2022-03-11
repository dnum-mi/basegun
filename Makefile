SHELL	:= /bin/bash
DOCKER	:= $(shell type -p docker)
DC		:= $(shell type -p docker-compose)
TAG		:= 0.4

export

check-prerequisites:
ifeq ("$(wildcard ${DOCKER})","")
	@echo "docker not found" ; exit 1
endif
ifeq ("$(wildcard ${DC})","")
	@echo "docker-compose not found" ; exit 1
endif

check-dc-config-%: check-prerequisites ## Check docker-compose syntax
	${DC} -f docker-compose-$*.yml config -q

build-%: check-dc-config-%
	TAG=${TAG} ${DC} -f docker-compose-$*.yml build

up-preprod: check-dc-config-prod
	PORT_PROD=3000 TAG=${TAG} ${DC} -f docker-compose-prod.yml up -d

up-%: check-dc-config-%
	TAG=${TAG} ${DC} -f docker-compose-$*.yml up -d

down-%:
	${DC} -f docker-compose-$*.yml down

show-current-tag:
	@while [ -z "$$CONTINUE" ]; do \
		read -r -p "Current tag is v${TAG}. Continue? [y/N]: " CONTINUE; \
	done ; \
	[ $$CONTINUE = "y" ] || [ $$CONTINUE = "Y" ] || (echo "Exiting."; exit 1;)

tag: show-current-tag
	git tag -a v${TAG}
	git push origin v${TAG}

untag: show-current-tag
	git tag -d v${TAG}
	git push --delete v${TAG}