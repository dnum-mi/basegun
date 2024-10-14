# Basegun FastAPI backend

## How to run ?

```shell
docker compose up -d
```

## How to run tests ?

```shell
docker compose exec backend pytest
```

## Run tests with coverage report ?

```shell
docker compose exec backend coverage -m pytest
docker compose exec backend coverage report
```

## How to stop ?

```shell
docker compose down
```
