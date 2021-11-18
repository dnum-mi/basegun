import shutil, os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
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
    return "Hello, World!"


@app.post("/upload")
async def imageupload(image: UploadFile = File(...)):
    input_path = os.path.join(TEMP, image.filename)
    with open(f'{input_path}', "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    result_path, label = image_detect(input_path)

    return {"file_name": result_path}
