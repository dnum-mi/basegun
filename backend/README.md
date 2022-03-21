# Basegun FastAPI backend

From this folder

## Install

**Download model** EfficientNetB7 from OVH Cloud, put it in src/weights/ :
```
ovhai data download GRA basegun-public models/EffB7_2022-03-01_17/EffB7_2022-03-01_17.pth -o src/weights/
```

### Without Docker
1. Activate python environment with Python=3.8 (conda or pyenv)
2. Download model `curl https://storage.gra.cloud.ovh.net/v1/AUTH_df731a99a3264215b973b3dee70a57af/basegun-public/models/EffB7_2022-03-01_17/EffB7_2022-03-01_17.pth -o src/weights/model.pth`
3. `pip install -r requirements.txt -f https://download.pytorch.org/whl/cpu/torch_stable.html`

### With Docker
1. Create variable HTTP_PROXY in your shell for the Ministry proxy
2. Build image `docker build --build-arg http_proxy https_proxy -t basegun-back:dev .`


## Run

**NB:** To run properly the code needs the environment variable "PATH_IMGS" which decides where the uploaded images will be.
If not specified it will be set to frontend/src/assets/temp.
It must be an **absolute** path.

### Without Docker
```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 5000
```

### With Docker
```bash
docker run --rm -d -p 5000:5000 basegun-back:dev -e PATH_IMGS=/tmp/basegun/
```

