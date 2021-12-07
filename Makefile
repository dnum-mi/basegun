TAG	:= 0.2


export

build-%:
	TAG=${TAG} docker-compose -f docker-compose-$*.yml build

up-%:
	TAG=${TAG} docker-compose -f docker-compose-$*.yml up -d

down-%:
	docker-compose -f docker-compose-$*.yml down