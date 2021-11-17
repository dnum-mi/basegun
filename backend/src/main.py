from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from src.model import image_detect, TEMP

app = FastAPI()

# allow requests from front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return "Hello, Patate!"

@app.get("/upload")
def process():
    input_path = os.path.join(TEMP, "input.jpg")
    result_path = image_detect(input_path)
    return result_path