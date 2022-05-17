import shutil
import os
from uuid import uuid4
import logging
from logging.handlers import TimedRotatingFileHandler
from datetime import datetime
import time
import json
from fastapi import Request, FastAPI, File, Form, UploadFile, HTTPException
from fastapi.responses import PlainTextResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from gelfformatter import GelfFormatter
from user_agents import parse
from src.model import load_model_inference, predict_image


def init_variable(var_name: str, path: str) -> str:
    """Inits global variable for folder path

    Args:
        var_name (str): variable name in environ
        path (str): folder path

    Returns:
        str: final variable value
    """
    if var_name in os.environ:
        VAR = os.environ[var_name]
    else:
        VAR = os.path.abspath(os.path.join(
                os.path.dirname(os.path.abspath(__file__)),
                path))
        print("WARNING: The variable "+var_name+" is not set. Using", VAR)
    os.makedirs(VAR, exist_ok = True)
    return VAR


def setup_logs(log_dir: str) -> logging.Logger:
    """Setup environment for logs

    Args:
        log_dir (str): folder for log storage

        logging.Logger: logger object
    """
    print(">>> Reload logs config")
    # clear previous logs
    for f in os.listdir(log_dir):
        os.remove(os.path.join(log_dir, f))
    # configure new logs
    formatter = GelfFormatter()
    logger = logging.getLogger("Basegun")
    # new log file at midnight
    log_file = os.path.join(log_dir, "log.json")
    handler = TimedRotatingFileHandler(
        log_file,
        when="midnight",
        interval=1,
        backupCount=7)
    logger.setLevel(logging.INFO)
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


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
PATH_IMGS = init_variable("PATH_IMGS", "../../frontend/public/temp")

# Logs
PATH_LOGS = init_variable("PATH_LOGS", "../logs")
logger = setup_logs(PATH_LOGS)

# Load model
MODEL_PATH = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "weights/model.pth")
model = None
if os.path.exists(MODEL_PATH):
    model = load_model_inference(MODEL_PATH)
if not model:
    raise RuntimeError("Model not found")


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
        return "-1.0"

@app.get("/logs")
def logs(request: Request):
    request_url = request.url._url
    if ("localhost" in request_url or "preprod" in request_url):
        with open(os.path.join(PATH_LOGS, "log.json"), "r") as f:
            lines = f.readlines()
            res = [json.loads(l) for l in lines]
            res.reverse()
            return res
    else:
        return PlainTextResponse("Forbidden")

@app.post("/upload")
async def imageupload(
    request: Request,
    image: UploadFile = File(...),
    date: float = Form(...),
    userId: str = Form(...),
    geolocation: str = Form(...) ):

    input_path = os.path.join(PATH_IMGS,
                    # rename with uuid for secure filename but keep original file ext
                    str(uuid4()) + os.path.splitext(image.filename)[1]
                )

    user_agent = parse(request.headers.get("user-agent"))
    device = "other"
    if user_agent.is_mobile:
        device = "mobile"
    elif user_agent.is_pc:
        device = "pc"
    elif user_agent.is_tablet:
        device = "tablet"

    extras_logging = {
        "bg_date": datetime.now().isoformat(),
        "bg_image_url": input_path,
        "bg_upload_time": round(time.time()-date, 2),
        "bg_user_id": userId,
        "bg_geolocation": geolocation,
        "bg_device": device,
        "bg_device_family": user_agent.device.family,
        "bg_device_os": user_agent.os.family,
        "bg_device_browser": user_agent.browser.family
    }

    # write image locally
    with open(f"{input_path}", "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    try:
        start = time.time()
        label, confidence = predict_image(model, input_path)
        extras_logging["bg_label"] = label
        extras_logging["bg_confidence"] = confidence
        extras_logging["bg_model_time"] = round(time.time()-start, 2)
        logger.info("Identification request", extra=extras_logging)
    except Exception as e:
        extras_logging["bg_error_type"] = e.__class__.__name__
        logger.exception(e, extra=extras_logging)
        raise HTTPException(status_code=500, detail=str(e))

    return {"file_name": input_path, "label": label, "confidence": confidence}


@app.post("/feedback")
async def log_feedback(request: Request):
    res = await request.json()
    extras_logging = {
        "bg_date": datetime.now().isoformat(),
        "bg_image_url": res["image_url"],
        "bg_feedback": res["feedback"]
    }
    logger.info("Identification feedback", extra=extras_logging)
    return