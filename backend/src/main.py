import shutil, os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from src.model import image_detect, PATH_IMGS

app = FastAPI()

origins = [
    "http://basegun.fr",
    "https://basegun.fr",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

# allow requests from front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return "Hello, World!"


@app.post("/upload")
async def imageupload(image: UploadFile = File(...)):
    input_path = os.path.join(PATH_IMGS, image.filename)
    with open(f'{input_path}', "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    result_path, label = image_detect(input_path)
    print("Finished processing, result:", result_path, label)

    return {"file_name": result_path, "label": label}
