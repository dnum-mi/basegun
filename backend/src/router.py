import logging
import os
import time
from typing import Union
from uuid import uuid4

from fastapi import (APIRouter, BackgroundTasks, Cookie, File, Form,
                     HTTPException, Request, Response, UploadFile)
from fastapi.responses import PlainTextResponse
from user_agents import parse

from .config import APP_VERSION, S3_PREFIX, get_base_logs
from .ml.utils.typology import get_typology_from_image
from .utils import upload_image

router = APIRouter(prefix="/api")


@router.get("/", response_class=PlainTextResponse)
def home():
    return "Basegun backend"


@router.get("/version", response_class=PlainTextResponse)
def version():
    return APP_VERSION


@router.post("/upload")
async def imageupload(
    request: Request,
    response: Response,
    background_tasks: BackgroundTasks,
    image: UploadFile = File(...),
    date: float = Form(...),
    user_id: Union[str, None] = Cookie(None),
):
    # prepare content logs
    user_agent = parse(request.headers.get("user-agent"))
    extras_logging = get_base_logs(user_agent, user_id)
    extras_logging["bg_upload_time"] = round(time.time() - date, 2)

    try:
        img_key = os.path.join(
            S3_PREFIX, str(uuid4()) + os.path.splitext(image.filename)[1].lower()
        )
        img_bytes = image.file.read()

        # upload image to OVH Cloud
        background_tasks.add_task(upload_image, img_bytes, img_key)
        extras_logging["bg_image_url"] = img_key

        # set user id
        if not user_id:
            user_id = uuid4()
            response.set_cookie(key="user_id", value=user_id)
            extras_logging["bg_user_id"] = user_id

        # send image to model for prediction
        start = time.time()
        label, confidence = get_typology_from_image(img_bytes)
        extras_logging["bg_label"] = label
        extras_logging["bg_confidence"] = confidence
        extras_logging["bg_model_time"] = round(time.time() - start, 2)
        if confidence < 0.76:
            extras_logging["bg_confidence_level"] = "low"
        elif confidence < 0.98:
            extras_logging["bg_confidence_level"] = "medium"
        else:
            extras_logging["bg_confidence_level"] = "high"

        logging.info("Identification request", extra=extras_logging)

        return {
            "path": img_key,
            "label": label,
            "confidence": confidence,
            "confidence_level": extras_logging["bg_confidence_level"],
        }

    except Exception as e:
        extras_logging["bg_error_type"] = e.__class__.__name__
        logging.exception(e, extra=extras_logging)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/identification-feedback")
async def log_feedback(request: Request, user_id: Union[str, None] = Cookie(None)):
    res = await request.json()

    user_agent = parse(request.headers.get("user-agent"))
    extras_logging = get_base_logs(user_agent, user_id)

    extras_logging["bg_feedback_bool"] = res["feedback"]
    for key in ["image_url", "label", "confidence", "confidence_level"]:
        extras_logging["bg_" + key] = res[key]

    logging.info("Identification feedback", extra=extras_logging)


@router.post("/tutorial-feedback")
async def log_tutorial_feedback(
    request: Request, user_id: Union[str, None] = Cookie(None)
):
    res = await request.json()

    user_agent = parse(request.headers.get("user-agent"))
    extras_logging = get_base_logs(user_agent, user_id)

    for key in [
        "image_url",
        "label",
        "confidence",
        "confidence_level",
        "tutorial_feedback",
        "tutorial_option",
        "route_name",
    ]:
        extras_logging["bg_" + key] = res[key]

    logging.info("Tutorial feedback", extra=extras_logging)


@router.post("/identification-dummy")
async def log_identification_dummy(
    request: Request, user_id: Union[str, None] = Cookie(None)
):
    res = await request.json()

    user_agent = parse(request.headers.get("user-agent"))
    extras_logging = get_base_logs(user_agent, user_id)

    # to know if the firearm is dummy or real
    extras_logging["bg_dummy_bool"] = res["is_dummy"]
    for key in [
        "image_url",
        "label",
        "confidence",
        "confidence_level",
        "tutorial_option",
    ]:
        extras_logging["bg_" + key] = res[key]

    logging.info("Identification dummy", extra=extras_logging)
