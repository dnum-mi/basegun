#!/bin/bash
docker tag basegun-frontend:action-prod ghcr.io/datalab-mi/basegun/basegun-frontend:$1
docker tag basegun-backend:action-prod ghcr.io/datalab-mi/basegun/basegun-backend:$1
docker push ghcr.io/datalab-mi/basegun/basegun-frontend:$1
docker push ghcr.io/datalab-mi/basegun/basegun-backend:$1