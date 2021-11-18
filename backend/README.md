# Basegun FastAPI backend

From this folder

## Install

### Without Docker
1. Activate python environment with Python=3.8 (conda or pyenv)
2. `pip install -r requirements.txt`

### With Docker
1. Create variable HTTP_PROXY in your shell for the Ministry proxy
2. Build image `docker build -t basegun:back --build-arg https_proxy=%HTTP_PROXY% .`


## Run
### Without Docker
`uvicorn src.main:app --reload --host 0.0.0.0 --port 5000`

### With Docker
`docker run --rm -d -p 5000:5000 basegun:back`