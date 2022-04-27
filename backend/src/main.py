import shutil
import os
from uuid import uuid4
import logging
import time
import json
from fastapi import FastAPI, File, Form, UploadFile, HTTPException, Request
from fastapi.responses import PlainTextResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from gelfformatter import GelfFormatter
from PIL import UnidentifiedImageError
from src.model import load_model_inference, predict_image


####################
#      SETUP       #
####################

# FastAPI Setup
app = FastAPI()
origins = [ # allow requests from front-end
    "http://basegun.fr",
    "https://basegun.fr",
    "http://preprod.basegun.fr",
    "https://preprod.basegun.fr",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Image storage
if "PATH_IMGS" in os.environ:
    PATH_IMGS = os.environ["PATH_IMGS"]
else:
    PATH_IMGS = os.path.abspath(os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "../../frontend/public/temp"))
    print("WARNING: The variable PATH_IMGS is not set. Using", PATH_IMGS)
os.makedirs(PATH_IMGS, exist_ok = True)


# Logs
if "PATH_LOGS" in os.environ:
    PATH_LOGS = os.environ["PATH_LOGS"]
else:
    PATH_LOGS = os.path.abspath(os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "../logs"))
    print("WARNING: The variable PATH_LOGS is not set. Using", PATH_LOGS)
os.makedirs(PATH_LOGS, exist_ok = True)
PATH_LOGS = os.path.join(PATH_LOGS, "log.json")
formatter = GelfFormatter()
logger = logging.getLogger("Basegun")
handler = logging.FileHandler(PATH_LOGS) # TODO: replace by TimedRotatingFileHandler
logger.setLevel(logging.INFO)
handler.setFormatter(formatter)
logger.addHandler(handler)


# Load model
MODEL_PATH = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "weights/model.pth")
model = None
if os.path.exists(MODEL_PATH):
    model = load_model_inference(MODEL_PATH)


####################
#     ROUTES       #
####################
@app.get("/", response_class=PlainTextResponse)
def home():
    return "Basegun backend"


@app.get("/version", response_class=PlainTextResponse)
def version():
    if "VERSION" in os.environ:
        return os.environ["VERSION"]
    else:
        return "unknown"


@app.get("/logs")
def logs(request: Request):
    request_url = request.url._url
    if ("localhost" in request_url or "preprod" in request_url):
        with open(PATH_LOGS, 'r') as f:
            lines = f.readlines()
            return [json.loads(l) for l in lines]
    else:
        return PlainTextResponse("Forbidden")


@app.post("/upload")
async def imageupload(image: UploadFile = File(...), date: float = Form(...)):
    if model:
        # store image in PATH_IMGS folder
        input_path = os.path.join(PATH_IMGS,
                        # rename with uuid for secure filename but keep original file ext
                        str(uuid4()) + os.path.splitext(image.filename)[1]
                    )
        with open(f'{input_path}', "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)


        extras_logging = {'image_url': input_path, 'upload_time': round(time.time()-date/1000, 2)}
        try:
            start = time.time()
            label, confidence = predict_image(model, input_path)
            extras_logging['label'] = label
            extras_logging['confidence'] = confidence
            extras_logging['processing_time'] = round(time.time()-start, 2)
            logger.info("Identification request",
                extra=extras_logging
            )
        except Exception as e:
            extras_logging['error_type'] = e.__class__.__name__
            logger.exception(e, extra=extras_logging)
            raise HTTPException(status_code=500, detail=str(e))

    else:
        logger.error("Model not found")
        raise HTTPException(status_code=404, detail="Model not found")
    return {"file_name": input_path, "label": label, "confidence": confidence}

