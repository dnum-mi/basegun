
import os
import logging
from logging.handlers import TimedRotatingFileHandler
from datetime import datetime
import time
import json
from uuid import uuid4
from typing import Union
from fastapi import BackgroundTasks, Cookie, FastAPI, File, Form, HTTPException, Request, Response, UploadFile
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from gelfformatter import GelfFormatter
from user_agents import parse
import swiftclient
from src.model import load_model_inference, predict_image


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
WORKSPACE = os.environ.get("WORKSPACE")

CLOUD_PATH = f'https://storage.gra.cloud.ovh.net/v1/' + \
    'AUTH_df731a99a3264215b973b3dee70a57af/basegun-public/' + \
    f'uploaded-images/{os.environ["WORKSPACE"]}/'


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
    """Setups environment for logs

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


def get_device(user_agent) -> str:
    """Explicitly gives the device of a user-agent object

    Args:
        user_agent: info given by the user browser

    Returns:
        str: mobile, pc, tablet or other
    """
    if user_agent.is_mobile:
        return "mobile"
    elif user_agent.is_pc:
        return "pc"
    elif user_agent.is_tablet:
        return "tablet"
    else:
        return "other"


def get_base_logs(user_agent, user_id: str) -> dict:
    """Generates the common information for custom logs in basegun.
        Each function can add some info specific to the current process,
        then we insert these custom logs as extra

    Args:
        user_agent: user agent object
        user_id (str): UUID identifying a unique user

    Returns:
        dict: the base custom information
    """
    extras_logging = {
        "bg_date": datetime.now().isoformat(),
        "bg_user_id": user_id,
        "bg_version": APP_VERSION,
        "bg_model": MODEL_VERSION,
        "bg_device": get_device(user_agent),
        "bg_device_family": user_agent.device.family,
        "bg_device_os": user_agent.os.family,
        "bg_device_browser": user_agent.browser.family,
    }
    return extras_logging


def upload_image_ovh(content: bytes, img_name: str):
    """Uploads an image to basegun ovh swift container
        path uploaded-images/WORKSPACE/img_name
        where WORKSPACE is dev, preprod or prod

    Args:
        content (bytes): file content
        img_name (str): name we want to give on ovh
    """
    num_tries = 0
    LIMIT_TRIES = 5
    image_path = os.path.join(CLOUD_PATH, img_name)
    start = time.time()

    if not conn:
        logger.exception("Variables not set for using OVH swift.", extra={
            "bg_error_type": "NameError"
        })
        return

    while num_tries <= LIMIT_TRIES:
        num_tries += 1
        extras_logging = {
            "bg_date": datetime.now().isoformat(),
            "bg_upload_time": time.time()-start,
            "bg_image_url": image_path
        }
        try:
            conn.put_object("basegun-public",
                            f'uploaded-images/{os.environ["WORKSPACE"]}/{img_name}',
                            contents=content)
            # if success, get out of the loop
            logger.info("Upload to OVH successful", extra=extras_logging)
            break
        except Exception as e:
            if (num_tries <= LIMIT_TRIES and e.__class__.__name__ == "ClientException"):
                # we try uploading another time
                time.sleep(30)
                continue
            else:
                extras_logging["bg_error_type"] = e.__class__.__name__
                logger.exception(e, extra=extras_logging)


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
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    logger.warn("File versions.json not found")
    APP_VERSION = "-1"
    MODEL_VERSION = "-1"


conn = None
if all(var in os.environ for var in ["OS_USERNAME", "OS_PASSWORD", "OS_PROJECT_NAME"]) :
    try:
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
        conn.get_account()
    except Exception as e:
        logger.exception(e)
else:
    logger.warn('Variables necessary for OVH connection not set !')


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
    response: Response,
    background_tasks: BackgroundTasks,
    image: UploadFile = File(...),
    date: float = Form(...),
    geolocation: str = Form(...),
    user_id: Union[str, None] = Cookie(None) ):

    # prepare content logs
    user_agent = parse(request.headers.get("user-agent"))
    extras_logging = get_base_logs(user_agent, user_id)
    extras_logging["bg_geolocation"] = geolocation
    extras_logging["bg_upload_time"] = round(time.time() - date, 2)

    try:
        img_name = str(uuid4()) + os.path.splitext(image.filename)[1]
        img_bytes = image.file.read()

        # upload image to OVH Cloud
        background_tasks.add_task(upload_image_ovh, img_bytes, img_name)
        image_path = os.path.join(CLOUD_PATH, img_name)
        extras_logging["bg_image_url"] = image_path

        # set user id
        if not user_id:
            user_id = uuid4()
            response.set_cookie(key="user_id", value=user_id)
            extras_logging["bg_user_id"] = user_id

        # send image to model for prediction
        start = time.time()
        label, confidence = predict_image(model, img_bytes)
        extras_logging["bg_label"] = label
        extras_logging["bg_confidence"] = confidence
        extras_logging["bg_model_time"] = round(time.time()-start, 2)
        if confidence < 46:
            extras_logging["bg_confidence_level"] = "low"
        elif confidence < 76:
            extras_logging["bg_confidence_level"] = "medium"
        else:
            extras_logging["bg_confidence_level"] = "high"

        logger.info("Identification request", extra=extras_logging)

        return {
            "path": image_path,
            "label": label,
            "confidence": confidence,
            "confidence_level": extras_logging["bg_confidence_level"]
        }

    except Exception as e:
        extras_logging["bg_error_type"] = e.__class__.__name__
        logger.exception(e, extra=extras_logging)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/identification-feedback")
async def log_feedback(request: Request, user_id: Union[str, None] = Cookie(None)):
    res = await request.json()

    user_agent = parse(request.headers.get("user-agent"))
    extras_logging = get_base_logs(user_agent, user_id)

    extras_logging["bg_feedback_bool"] = res["feedback"]
    for key in ["image_url", "label", "confidence", "confidence_level"]:
        extras_logging["bg_"+key] = res[key]

    logger.info("Identification feedback", extra=extras_logging)
    return


@app.post("/tutorial-feedback")
async def log_tutorial_feedback(request: Request, user_id: Union[str, None] = Cookie(None)):
    res = await request.json()

    user_agent = parse(request.headers.get("user-agent"))
    extras_logging = get_base_logs(user_agent, user_id)

    for key in ["image_url", "label", "confidence", "confidence_level",
        "tutorial_feedback", "tutorial_option", "route_name"]:
        extras_logging["bg_"+key] = res[key]

    logger.info("Tutorial feedback", extra=extras_logging)
    return


@app.post("/identification-dummy")
async def log_identification_dummy(request: Request, user_id: Union[str, None] = Cookie(None)):
    res = await request.json()

    user_agent = parse(request.headers.get("user-agent"))
    extras_logging = get_base_logs(user_agent, user_id)

    # to know if the firearm is dummy or real
    extras_logging["bg_dummy_bool"] = res["is_dummy"]
    for key in ["image_url", "label", "confidence", "confidence_level", "tutorial_option"]:
        extras_logging["bg_"+key] = res[key]

    logger.info("Identification dummy", extra=extras_logging)
    return