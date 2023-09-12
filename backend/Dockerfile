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
COPY requirements/ requirements/
ENV PIP_CERT=$CACERT_LOCATION
RUN pip --default-timeout=300 install --upgrade pip \
    && pip --default-timeout=300 install --no-cache-dir -r requirements/common.txt \
    && rm -r /root/.cache

ARG VERSION
ARG MODEL="EffB7_2023-03-06_08"
ENV SSL_CERT_FILE=$CACERT_LOCATION
RUN curl -o model.pth https://storage.gra.cloud.ovh.net/v1/AUTH_df731a99a3264215b973b3dee70a57af/basegun-public/models/${MODEL}/${MODEL}.pth
COPY src/ src/
RUN mkdir -p src/weights \
    && mv model.pth src/weights/model.pth \
    && echo '{"app": "'${VERSION}'", "model": "'${MODEL}'"}' > versions.json

# launch website
FROM base as dev
RUN pip --default-timeout=300 install --no-cache-dir -r requirements/dev.txt
CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]

FROM base as test
RUN pip install -r requirements/dev.txt && pip install requests && rm -r /root/.cache
COPY tests/ tests/
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]

FROM base as prod
RUN pip install --no-cache-dir -r requirements/prod.txt
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
