import logging
import time
from datetime import datetime

from .config import S3, S3_BUCKET_NAME


def upload_image(content: bytes, image_key: str):
    """Uploads an image to s3 bucket
        path uploaded-images/WORKSPACE/img_name
        where WORKSPACE is dev, preprod or prod

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
