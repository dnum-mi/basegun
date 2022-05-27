import shutil
import os
import logging
from logging.handlers import TimedRotatingFileHandler
from datetime import datetime
import time
import json
import asyncio
from uuid import uuid4
from fastapi import Request, FastAPI, File, Form, UploadFile, HTTPException
from fastapi.responses import PlainTextResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from gelfformatter import GelfFormatter
from user_agents import parse
import swiftclient
from src.model import load_model_inference, predict_image

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

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
                CURRENT_DIR,
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
PATH_IMGS = init_variable("PATH_IMGS", "../images")

# Logs
PATH_LOGS = init_variable("PATH_LOGS", "../logs")
logger = setup_logs(PATH_LOGS)

# Load model
MODEL_PATH = os.path.join(
            CURRENT_DIR,
            "weights/model.pth")
model = None
if os.path.exists(MODEL_PATH):
    model = load_model_inference(MODEL_PATH)
if not model:
    raise RuntimeError("Model not found")

# Versions
if "versions.json" in os.listdir(os.path.dirname(CURRENT_DIR)):
    with open("versions.json", "r") as f:
        versions = json.load(f)
        APP_VERSION = versions["app"]
        MODEL_VERSION = versions["model"]
else:
    print("WARNING: file versions.json not found")
    APP_VERSION = "-1"
    MODEL_VERSION = "-1"

# Connection to OVH cloud
conn = swiftclient.Connection(
    authurl="https://auth.cloud.ovh.net/v3",
    user=os.environ["OS_USERNAME"],
    key=os.environ["OS_PASSWORD"],
    os_options={
        "project_name": os.environ["OS_PROJECT_NAME"],
        "region_name": "GRA"
    },
    auth_version='3'
)
CLOUD_PATH = f'https://storage.gra.cloud.ovh.net/v1/\
AUTH_df731a99a3264215b973b3dee70a57af/basegun-public/\
uploaded-images/{os.environ["WORKSPACE"]}/'

conn.get_account()

async def upload_image_ovh(content, img_name):
    """ Uploads an image to owh swift container basegun-public
        path uploaded-images/WORKSPACE/img_name
        where WORKSPACE is dev, preprod or prod

    Args:
        content (bytes): file content
        img_name (str): name we want to give on ovh
    """
    conn.put_object("basegun-public",
                    f'uploaded-images/{os.environ["WORKSPACE"]}/{img_name}',
                    contents=content)


####################
#     ROUTES       #
####################
@app.get("/", response_class=PlainTextResponse)
def home():
    return "Basegun backend"


@app.get("/version", response_class=PlainTextResponse)
def version():
    return APP_VERSION


@app.get("/logs")
def logs():
    if "WORKSPACE" in os.environ and os.environ["WORKSPACE"] != "prod":
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

    try:
        img_name = str(uuid4()) + os.path.splitext(image.filename)[1]
        img_bytes = image.file.read()

        # upload image to OVH Cloud
        upload = asyncio.create_task(upload_image_ovh(img_bytes, img_name))

        # prepare content logs
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
            "bg_image_url": os.path.join(CLOUD_PATH, img_name),
            "bg_upload_time": round(time.time()-date, 2),
            "bg_user_id": userId,
            "bg_geolocation": geolocation,
            "bg_device": device,
            "bg_device_family": user_agent.device.family,
            "bg_device_os": user_agent.os.family,
            "bg_device_browser": user_agent.browser.family,
            "bg_version": APP_VERSION,
            "bg_model": MODEL_VERSION,
        }

        # send image to model for prediction
        start = time.time()
        prediction = asyncio.create_task(predict_image(model, img_bytes))
        label, confidence = await prediction
        extras_logging["bg_label"] = label
        extras_logging["bg_confidence"] = confidence
        extras_logging["bg_model_time"] = round(time.time()-start, 2)
        if confidence < 41:
            extras_logging["bg_confidence_level"] = "low"
        elif confidence < 65:
            extras_logging["bg_confidence_level"] = "medium"
        else:
            extras_logging["bg_confidence_level"] = "high"
        logger.info("Identification request", extra=extras_logging)

        await upload

        return {
            "file": os.path.join(CLOUD_PATH, img_name),
            "label": label,
            "confidence": confidence,
            "confidence_level": extras_logging["bg_confidence_level"]
        }

    except Exception as e:
        extras_logging["bg_error_type"] = e.__class__.__name__
        logger.exception(e, extra=extras_logging)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/feedback")
async def log_feedback(request: Request):
    res = await request.json()
    extras_logging = {
        "bg_date": datetime.now().isoformat(),
        "bg_image_url": res["image_url"],
        "bg_feedback_bool": res["feedback"],
        "bg_confidence": res["confidence"],
        "bg_label": res["label"],
        "bg_confidence_level": res["confidence_level"]
    }
    logger.info("Identification feedback", extra=extras_logging)
    return