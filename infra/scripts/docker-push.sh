#!/bin/bash
docker tag basegun-frontend:$1-prod ghcr.io/datalab-mi/basegun/basegun-frontend:$2
docker tag basegun-backend:$1-prod ghcr.io/datalab-mi/basegun/basegun-backend:$2
docker push ghcr.io/datalab-mi/basegun/basegun-frontend:$2
docker push ghcr.io/datalab-mi/basegun/basegun-backend:$2