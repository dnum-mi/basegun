FROM python:3.11-slim as base
WORKDIR /app

# certificates config
ARG CACERT_LOCATION
COPY ./cert/. /etc/ssl/certs/

# librairies necessary for image processing
RUN apt update && apt install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    curl \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# install python libraries
COPY requirements.txt .
ENV PIP_CERT=$CACERT_LOCATION
RUN pip --default-timeout=300 install --upgrade pip \
    && pip --default-timeout=300 install --no-cache-dir -r requirements.txt \
    && rm -r /root/.cache

ARG VERSION
ENV SSL_CERT_FILE=$CACERT_LOCATION
COPY . .