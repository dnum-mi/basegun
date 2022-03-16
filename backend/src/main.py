import shutil, os
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from src.model import load_model_inference, test_image

app = FastAPI()

origins = [
    "http://basegun.fr",
    "https://basegun.fr",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

MODEL_PATH = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "weights/EffB7_2022-03-01_17.pth")

if "PATH_IMGS" in os.environ:
    PATH_IMGS = os.environ["PATH_IMGS"]
else:
    PATH_IMGS = os.path.abspath(os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "../../frontend/public/temp"))
    print("WARNING: The variable PATH_IMGS is not set. Using", PATH_IMGS)

# allow requests from front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
if os.path.exists(MODEL_PATH):
    model = load_model_inference(MODEL_PATH)


@app.get("/")
def home():
    return "Basegun backend"


@app.post("/upload")
async def imageupload(image: UploadFile = File(...)):
    if model:
        input_path = os.path.join(PATH_IMGS, image.filename)
        with open(f'{input_path}', "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        label, confidence = test_image(model, input_path)
        print("Finished processing, result:", input_path, label, confidence)
    else:
        raise HTTPException(status_code=404, detail="Model not found")
    return {"file_name": input_path, "label": label, "confidence": confidence}

