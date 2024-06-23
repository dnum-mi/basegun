import os
from datetime import datetime

import boto3
from gelfformatter import GelfFormatter

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

PATH_LOGS = os.environ.get("PATH_LOGS", "/tmp/logs")

LOGS_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"standard": {"()": lambda: GelfFormatter()}},
    "handlers": {
        "default": {
            "class": "logging.StreamHandler",
            "formatter": "standard",
            "level": "INFO",
            "stream": "ext://sys.stdout",
        },
        "file": {
            "class": "logging.handlers.TimedRotatingFileHandler",
            "when": "midnight",
            "utc": True,
            "backupCount": 5,
            "level": "INFO",
            "filename": f"{PATH_LOGS}/log.json",
            "formatter": "standard",
        },
    },
    "loggers": {"": {"handlers": ["default", "file"], "level": "DEBUG"}},
}

HEADERS = [
    {"name": "Cache-Control", "value": "no-store, max-age=0"},
    {"name": "Clear-Site-Data", "value": '"cache","cookies","storage"'},
    {
        "name": "Content-Security-Policy",
        "value": "default-src 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; block-all-mixed-content",
    },
    {"name": "Cross-Origin-Embedder-Policy", "value": "require-corp"},
    {"name": "Cross-Origin-Opener-Policy", "value": "same-origin"},
    {"name": "Cross-Origin-Resource-Policy", "value": "same-origin"},
    {
        "name": "Permissions-Policy",
        "value": "accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),gamepad=(),geolocation=(),gyroscope=(),layout-animations=(self),legacy-image-formats=(self),magnetometer=(),microphone=(),midi=(),oversized-images=(self),payment=(),picture-in-picture=(),publickey-credentials-get=(),speaker-selection=(),sync-xhr=(self),unoptimized-images=(self),unsized-media=(self),usb=(),screen-wake-lock=(),web-share=(),xr-spatial-tracking=()",
    },
    {"name": "Pragma", "value": "no-cache"},
    {"name": "Referrer-Policy", "value": "no-referrer"},
    {
        "name": "Strict-Transport-Security",
        "value": "max-age=31536000 ; includeSubDomains",
    },
    {"name": "X-Content-Type-Options", "value": "nosniff"},
    {"name": "X-Frame-Options", "value": "deny"},
    {"name": "X-Permitted-Cross-Domain-Policies", "value": "none"},
]


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


# Object storage
S3_URL_ENDPOINT = os.environ["S3_URL_ENDPOINT"]
S3_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]
S3_PREFIX = os.path.join("uploaded-images/")

S3 = boto3.resource("s3", endpoint_url=S3_URL_ENDPOINT, verify=False)

# Versions
APP_VERSION = "-1"
MODEL_VERSION = "-1"

TYPOLOGIES_MEASURED = [
    "epaule_a_levier_sous_garde",
    "epaule_a_pompe",
    "epaule_a_un_coup_par_canon",
    "epaule_a_verrou",
    "epaule_semi_auto_style_chasse",
]