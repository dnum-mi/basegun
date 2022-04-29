import shutil
import os
from uuid import uuid4
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import PlainTextResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import UnidentifiedImageError
from src.model import load_model_inference, predict_image

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
            "weights/model.pth")

if "PATH_IMGS" in os.environ:
    PATH_IMGS = os.environ["PATH_IMGS"]
else:
    PATH_IMGS = os.path.abspath(os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "../../frontend/public/temp"))
    print("WARNING: The variable PATH_IMGS is not set. Using", PATH_IMGS)
os.makedirs(PATH_IMGS, exist_ok = True)

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


@app.get("/", response_class=PlainTextResponse)
def home():
    return "Basegun backend"


@app.get("/version", response_class=PlainTextResponse)
def version():
    if "VERSION" in os.environ:
        return os.environ["VERSION"]
    else:
        return "-1.0"


@app.post("/upload")
async def imageupload(image: UploadFile = File(...)):
    if model:
        input_path = os.path.join(
                        PATH_IMGS, # store image in PATH_IMGS folder
                        # rename with uuid for secure filename but keep original file ext
                        str(uuid4()) + os.path.splitext(image.filename)[1]
                    )
        with open(f'{input_path}', "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        try:
            label, confidence = predict_image(model, input_path)
            print("Finished processing, result:", input_path, label, confidence)
        except UnidentifiedImageError:
            raise HTTPException(status_code=400, detail="Corrupted image file")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    else:
        raise HTTPException(status_code=404, detail="Model not found")
    return {"file_name": input_path, "label": label, "confidence": confidence}

