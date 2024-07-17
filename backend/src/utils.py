import logging
import time
from datetime import datetime
from email.message import EmailMessage

from src.config import SMTPClient

from .config import S3, S3_BUCKET_NAME


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


def send_mail(subject: str, to: str, message: str):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = "noreply@interieur.gouv.fr"
    msg["To"] = to
    msg.set_content(message)
    SMTPClient.send_message(msg)
