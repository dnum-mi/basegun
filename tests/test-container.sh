#!/bin/bash
set -e

active_container=$(docker ps)

if [ -z "${active_container}" ]; then
    echo "no container is running"
    exit 1
else
    echo "container with id $active_container is running"
fi