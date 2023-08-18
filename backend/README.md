# Basegun FastAPI backend

## Install
From this folder

### Without Docker
1. Activate python environment with Python=3.8 (conda or pyenv)
2. Download model `curl https://storage.gra.cloud.ovh.net/v1/AUTH_df731a99a3264215b973b3dee70a57af/basegun-public/models/EffB7_2022-03-01_17/EffB7_2022-03-01_17.pth -o src/weights/model.pth`
3. `pip install -r requirements.txt -f https://download.pytorch.org/whl/cpu/torch_stable.html`

### With Docker
Build image
```bash
docker build --target dev -t basegun-back:dev .
```
If you are in a network blocked with proxy, remember to add arg `--build_arg https_proxy` where `https_proxy` is a variable already set in your env.


## Run

### Without Docker
```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 5000
```

### With Docker
```bash
docker run --rm -d -p 5000:5000 --name basegun_back -e VERSION=1.2 basegun-back:dev
```
Remember afterwards to stop container `docker stop basegun_back`

## Run tests
1. Build image to target test `TAG=0.0 docker build --target test -t basegun-back:test .`
2. Start container `docker run --rm --name basegun_back_test -d basegun-back:test`
3. Execute tests `docker exec basegun_back_test python -m unittest discover -v`
