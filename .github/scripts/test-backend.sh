#!/bin/bash
set -e

response_home=$(curl -s http://localhost:5000)
response_upload=$(curl -X POST -H "Content-Type: multipart/form-data" -F "image=@backend/tests/revolver.jpg" http://localhost:5000/upload)

if [ "${response_home}" = "\"Basegun backend\"" ]; then
    echo "Backend is running";
    if [ "${response_upload:0:73}" = '{"file_name":"/app/images/revolver.jpg","label":"revolver","confidence":9' ]; then
        echo "Image upload and analysis works properly"
    else
        echo "Image upload and analysis down"
    fi
    # exit 1
else
    echo "Backend is down"
    # exit 0
fi