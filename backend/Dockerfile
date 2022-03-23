FROM python:3.9-slim-buster as base
WORKDIR /app

# librairies necessary for image processing
RUN apt update && apt install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# install python libraries
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -f https://download.pytorch.org/whl/cpu/torch_stable.html -r requirements.txt \
    && rm -r /root/.cache

# launch website
RUN curl -o model.pth https://storage.gra.cloud.ovh.net/v1/AUTH_df731a99a3264215b973b3dee70a57af/basegun-public/models/EffB7_2022-03-01_17/EffB7_2022-03-01_17.pth
COPY src/ src/
RUN mkdir -p src/weights && mv model.pth src/weights/model.pth

FROM base as web
CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "5000"]

FROM base as test
RUN pip install requests && rm -r /root/.cache
COPY tests/ tests/
CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "5000"]