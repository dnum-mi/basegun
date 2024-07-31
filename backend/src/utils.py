import logging
import time
from datetime import datetime
from email.message import EmailMessage
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from src.config import SMTPClient

from .config import OAUTH2_SCHEME, PUBLIC_KEY, S3, S3_BUCKET_NAME


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
    SMTPClient.send_message(msg)


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
            algorithms=["RS256"],
            audience=["master-realm", "account"],
        )
    except jwt.InvalidTokenError:
        raise credentials_exception
