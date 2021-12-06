# Basegun FastAPI backend

From this folder

## Install

### Without Docker
1. Activate python environment with Python=3.8 (conda or pyenv)
2. `pip install -r requirements.txt`

### With Docker
1. Create variable HTTP_PROXY in your shell for the Ministry proxy
2. Build image `docker build -t basegun:back .`


## Run

**NB:** To run properly the code needs the environment variable "PATH_IMGS", which says where the uploaded images will be, to be set.
When running with Docker you can use whichever folder, but without Docker you need to set to frontend/src/assets/temp.
It must be an **absolute** path.

### Without Docker
```bash
export PATH_IMGS=$PWD/../frontend/src/assets/temp
uvicorn src.main:app --reload --host 0.0.0.0 --port 5000
```

### With Docker
```bash
docker run --rm -d -p 5000:5000 basegun:back -e PATH_IMGS=/tmp/basegun/
```

