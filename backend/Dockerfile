FROM python:3.9-slim-buster
WORKDIR /app

# librairies necessary for image processing
RUN apt update && apt install -y libgl1-mesa-glx libglib2.0-0

# install python libraries
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# launch website
COPY src/ src/
CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "5000"]