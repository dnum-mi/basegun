import logging
import os
import time
from typing import Annotated, Union
from uuid import uuid4

from basegun_ml.classification import get_typology
from basegun_ml.exceptions import MissingCard, MissingGun
from basegun_ml.measure import get_lengths
from basegun_ml.ocr import is_alarm_weapon
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
    status,
)
from fastapi.responses import PlainTextResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from user_agents import parse

from .config import (
    APP_VERSION,
    CELLPHONE_NUMBER,
    PHONE_NUMBER,
    S3_PREFIX,
    TYPOLOGIES_MEASURED,
    get_base_logs,
)
from .utils import get_current_user, send_mail, upload_image

router = APIRouter(prefix="/api")
limiter = Limiter(key_func=get_remote_address)


@router.get("/", response_class=PlainTextResponse)
@limiter.limit("60/minute")
def home(request: Request):
    return "Basegun backend"


@router.get("/version", response_class=PlainTextResponse)
@limiter.limit("60/minute")
def version(request: Request):
    return APP_VERSION


@router.get("/contact-details")
@limiter.limit("60/minute")
async def phone_number(
    current_user: Annotated[dict, Depends(get_current_user)],
    request: Request,
):
    if current_user.get("idp") != "proxyma":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Invalid idp",
        )
    return {
        "phone": PHONE_NUMBER,
        "cellphone": CELLPHONE_NUMBER,
    }


@router.post("/upload")
@limiter.limit("60/minute")
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
            try:
                gun_length, gun_barrel_length, conf_card = get_lengths(img_bytes)

            except MissingGun as e:
                extras_logging["bg_missing_gun"] = e.__class__.__name__
                logging.exception(e, extra=extras_logging)

            except MissingCard as e:
                extras_logging["bg_missing_card"] = e.__class__.__name__
                logging.exception(e, extra=extras_logging)

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
@limiter.limit("60/minute")
async def log_feedback(request: Request, user_id: Union[str, None] = Cookie(None)):
    res = await request.json()

    user_agent = parse(request.headers.get("user-agent"))
    extras_logging = get_base_logs(user_agent, user_id)

    extras_logging["bg_feedback_bool"] = res["feedback"]
    for key in ["image_url", "label", "confidence", "confidence_level"]:
        extras_logging["bg_" + key] = res[key]

    logging.info("Identification feedback", extra=extras_logging)


@router.post("/tutorial-feedback")
@limiter.limit("60/minute")
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


@router.post("/expert-contact")
@limiter.limit("60/minute")
async def expert_contact(
    request: Request,
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
        to=os.environ["IRCGN_EMAIL"],
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


@router.post("/identification-alarm-gun")
@limiter.limit("60/minute")
async def image_alarm_gun(
    request: Request,
    image: UploadFile = File(...),
):
    try:
        img_bytes = image.file.read()
        # Process image with ML models
        return {"is_alarm_model": is_alarm_weapon(img_bytes) == "Alarm_model"}

    except Exception as e:
        return {"is_alarm_model": False, "exception": e.__class__.__name__}
