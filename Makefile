SHELL	:= /bin/bash
DOCKER	:= $(shell type -p docker)
DC		:= $(shell type -p docker-compose)
TAG		:= 0.2

export

check-prerequisites:
ifeq ("$(wildcard ${DOCKER})","")
	@echo "docker not found" ; exit 1
endif
ifeq ("$(wildcard ${DC})","")
	@echo "docker-compose not found" ; exit 1
endif

check-dc-config-%: check-prerequisites ## Check development docker-compose syntax
	${DC} -f docker-compose-$*.yml config -q

build-%: check-dc-config-%
	TAG=${TAG} ${DC} -f docker-compose-$*.yml build

up-%: check-dc-config-%
	TAG=${TAG} ${DC} -f docker-compose-$*.yml up -d

down-%:
	${DC} -f docker-compose-$*.yml down