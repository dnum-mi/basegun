import logging
import time
from datetime import datetime
from email.message import EmailMessage
from smtplib import SMTP
from typing import Annotated

import jwt
import requests
from fastapi import Depends, HTTPException, status

from src.config import OIDC_CLIENT_ID

from .config import (
    EMAIL_HOST,
    EMAIL_PORT,
    OAUTH2_SCHEME,
    PUBLIC_KEY,
    S3,
    S3_BUCKET_NAME,
)


def upload_image(content: bytes, image_key: str):
    """Uploads an image to s3 bucket
        path uploaded-images/img_name
    Args:
        content (bytes): file content
        image_key (str): path we want to have
    """
    start = time.time()
    object = S3.Object(S3_BUCKET_NAME, image_key)
    object.put(Body=content)
    extras_logging = {
        "bg_date": datetime.now().isoformat(),
        "bg_upload_time": time.time() - start,
        "bg_image_url": image_key,
    }
    logging.info("Upload successful", extra=extras_logging)


async def send_mail(subject: str, to: str, message: str, attachements: list = []):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = "noreply@interieur.gouv.fr"
    msg["To"] = to
    msg.set_content(message)
    for attachement in attachements:
        msg.add_attachment(
            await attachement.read(),
            maintype="image",
            subtype=attachement.content_type,
            filename=attachement.filename,
        )
    with SMTP(EMAIL_HOST, EMAIL_PORT) as smtp_client:
        smtp_client.send_message(msg)


async def get_current_user(token: Annotated[str, Depends(OAUTH2_SCHEME)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        return jwt.decode(
            token.split()[1],
            PUBLIC_KEY,
            audience=OIDC_CLIENT_ID,
            algorithms=["RS256"],
        )
    except jwt.InvalidTokenError as exception:
        logging.error(exception)
        raise credentials_exception


def get_access_token(username, password, client_id):
    url = "http://keycloak:8080/realms/basegun/protocol/openid-connect/token"

    response = requests.post(
        url,
        data={
            "client_id": client_id,
            "username": username,
            "password": password,
            "grant_type": "password",
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    if response.status_code != 200:
        raise Exception(f"Expected status 200, got {response.status_code}")

    access_token = response.json().get("access_token")
    if access_token is None:
        raise Exception("Access token not found")

    return access_token
