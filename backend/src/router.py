import logging
import os
import time
from typing import Annotated, Union
from uuid import uuid4

from basegun_ml.classification import get_typology
from basegun_ml.measure import get_lengths
from fastapi import (
    APIRouter,
    BackgroundTasks,
    Cookie,
    Depends,
    File,
    Form,
    HTTPException,
    Request,
    Response,
    UploadFile,
)
from fastapi.responses import PlainTextResponse
from user_agents import parse

from .config import APP_VERSION, S3_PREFIX, TYPOLOGIES_MEASURED, get_base_logs
from .utils import get_current_user, send_mail, upload_image

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

        start = time.time()
        # Process image with ML models
        label, confidence, confidence_level = get_typology(img_bytes)

        gun_length, gun_barrel_length, conf_card = None, None, None
        if label in TYPOLOGIES_MEASURED and confidence_level != "low":
            gun_length, gun_barrel_length, conf_card = get_lengths(img_bytes)

        # Temporary fix while ML package send 0 instead of None
        # https://github.com/dnum-mi/basegun-ml/issues/14
        gun_length = None if gun_length == 0 else gun_length
        gun_barrel_length = None if gun_barrel_length == 0 else gun_barrel_length

        extras_logging["bg_label"] = label
        extras_logging["bg_confidence"] = confidence
        extras_logging["bg_gun_length"] = gun_length
        extras_logging["bg_gun_barrel_length"] = gun_barrel_length
        extras_logging["bg_conf_card"] = conf_card
        extras_logging["bg_model_time"] = round(time.time() - start, 2)
        extras_logging["bg_confidence_level"] = confidence_level

        logging.info("Identification request", extra=extras_logging)

        return {
            "path": img_key,
            "label": label,
            "confidence": confidence,
            "confidence_level": confidence_level,
            "gun_length": gun_length,
            "gun_barrel_length": gun_barrel_length,
            "conf_card": conf_card,
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
        "selected_options",
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
        "selected_options",
    ]:
        extras_logging["bg_" + key] = res[key]

    logging.info("Identification dummy", extra=extras_logging)


@router.post("/expert-contact")
async def expert_contact(
    firstname: Annotated[str, Form()],
    lastname: Annotated[str, Form()],
    nigend: Annotated[str, Form()],
    service: Annotated[str | None, Form()],
    phone: Annotated[str, Form()],
    email: Annotated[str, Form()],
    seizure: Annotated[str, Form()],
    una_or_procedure_number: Annotated[str, Form()],
    files: Annotated[
        list[UploadFile], File(description="Multiple files as UploadFile")
    ],
    current_user: Annotated[dict, Depends(get_current_user)],
    # Optionnal fields
    markings_description: Annotated[str, Form()] = None,
    gun_type: Annotated[str, Form()] = None,
    gun_barrel_length: Annotated[int, Form()] = None,
    gun_length: Annotated[int, Form()] = None,
):
    await send_mail(
        subject="[Basegun] Demande d'identification",
        to="db.dcpc.ircgn@gendarmerie.interieur.gouv.fr",
        message=f"""
        Nom : {lastname}
        Prénom : {firstname}
        NIGEND / matricule : {nigend}
        Service d'affectation : {service}
        Téléphone : {phone}
        Email : {email}
        Saisie : {seizure}
        N° de procédure : {una_or_procedure_number}
        Typologie de l'arme (épaule ou poing) : {gun_type}
        Longueur de l'arme : {gun_length}
        Longueur du canon de l'arme : {gun_barrel_length}
        Précision sur les marquages présents sur l'arme : {markings_description}
        """,
        attachements=files,
    )
