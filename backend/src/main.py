from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil

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

@app.post("/image")
def image():
    return FileResponse

@app.post("/imageupload")
async def imageupload(image: UploadFile = File(...)):
    with open(f'{image.filename}', "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    return {"file_name": image.filename}