FROM python:3.11-slim AS base
WORKDIR /app

# librairies necessary for image processing
RUN apt update && apt install -y \
    libgl1 \
    libglib2.0-0 \
    curl \
    gcc \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# install python libraries
COPY requirements.txt .
RUN pip --default-timeout=300 install --upgrade pip \
    && pip --default-timeout=300 install --no-cache-dir -r requirements.txt \
    && rm -r /root/.cache

ARG VERSION
COPY . .