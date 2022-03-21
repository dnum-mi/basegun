#!/bin/bash
set -e

active_container=$(docker ps --format "{{.Names}}")

if [ -z "${active_container}" ]; then
    echo "no container is running"
    exit 1
else
    echo "container with name $active_container is running"
    exit 0
fi