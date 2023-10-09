FROM python:3.9-slim-buster as base
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

# install python libraries (except torch)
COPY requirements.txt .
ENV PIP_CERT=$CACERT_LOCATION
RUN pip --default-timeout=300 install --upgrade pip \
    && pip --default-timeout=300 install --no-cache-dir -r requirements.txt \
    && rm -r /root/.cache

ARG VERSION
ARG MODEL="EffB7_2023-03-06_08"
ENV SSL_CERT_FILE=$CACERT_LOCATION
RUN curl -o model.pth https://storage.gra.cloud.ovh.net/v1/AUTH_df731a99a3264215b973b3dee70a57af/basegun-public/models/${MODEL}/${MODEL}.pth
COPY src/ src/
RUN mkdir -p src/weights \
    && mv model.pth src/weights/model.pth \
    && echo '{"app": "'${VERSION}'", "model": "'${MODEL}'"}' > versions.json

FROM base as dev
COPY tests/ tests/
CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "5000"]

FROM base as prod
RUN pip install --extra-index-url https://download.pytorch.org/whl/cpu \
    torch==1.13.0+cpu torchvision==0.14.0+cpu && rm -r /root/.cache
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "5000"]
