FROM python:3.9-buster

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY src/ src/
CMD uvicorn src.main:app --reload --host 0.0.0.0 --port 5000