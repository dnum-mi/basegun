FROM python:3.9-slim-buster
WORKDIR /app

# librairies necessary for image processing
RUN apt update && apt install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# install python libraries
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -f https://download.pytorch.org/whl/cpu/torch_stable.html -r requirements.txt \
    && rm -r /root/.cache

# launch website
COPY src/ src/
CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "5000"]