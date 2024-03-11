import json
import os
import time
from io import BytesIO

import boto3
import pytest
import requests
from fastapi.testclient import TestClient
from src.main import S3_BUCKET_NAME, S3_URL_ENDPOINT, app

client = TestClient(app)

BUCKET_POLICY = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": f"arn:aws:s3:::{S3_BUCKET_NAME}/*",
        }
    ],
}


def create_bucket():
    s3 = boto3.resource("s3", endpoint_url=S3_URL_ENDPOINT)
    bucket = s3.Bucket(S3_BUCKET_NAME)
    if bucket.creation_date is None:
        bucket.create()
        bucket.Policy().put(Policy=json.dumps(BUCKET_POLICY))


class TestApi:
    def test_home(self):
        """Checks that the route / is alive"""
        response = client.get("/api/")
        assert response.text == "Basegun backend"

    def test_version(self):
        """Checks that the route /version sends a version"""
        response = client.get("/api/version")
        assert response.status_code == 200

    def check_log_base(self, log):
        assert {
            "timestamp",
            "version",
            "host",
            "level",
            "short_message",
            "_bg_date",
            "_bg_user_id",
            "_bg_device",
            "_bg_device_os",
            "_bg_device_family",
            "_bg_device_browser",
            "_bg_version",
            "_bg_model",
        }.issubset(set(log.keys()))
        assert log["level"] == 6
        assert log["_bg_model"].startswith("EffB")

    def test_upload(self):
        """Checks that the file upload works properly"""
        if os.environ["WORKSPACE"] == "dev":
            create_bucket()
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "revolver.jpg")

        with open(path, "rb") as f:
            r = client.post(
                "/api/upload",
                files={"image": f},
                data={"date": time.time()},
            )
        assert r.status_code == 200
        res = r.json()

        # checks that the json result is as expected
        assert res["label"] == "revolver"
        assert res["confidence"] == pytest.approx(1, 0.1)
        assert res["confidence_level"] == "high"

    def test_feedback_and_logs(self):
        """Checks that the feedback works properly"""
        confidence = 90
        label = "revolver"
        confidence_level = "high"
        image_url = "https://storage.gra.cloud.ovh.net/v1/test"
        r = client.post(
            "/api/identification-feedback",
            json={
                "image_url": image_url,
                "feedback": True,
                "confidence": confidence,
                "label": label,
                "confidence_level": confidence_level,
            },
        )

        assert r.status_code == 200

    def test_headers(self):
        HEADERS_TO_ADD = requests.get(
            "https://owasp.org/www-project-secure-headers/ci/headers_add.json"
        ).json()["headers"]
        HEADERS_TO_REMOVE = requests.get(
            "https://owasp.org/www-project-secure-headers/ci/headers_remove.json"
        ).json()["headers"]
        CURRENT_HEADERS = client.get("/api/version").headers

        for header_to_remove in HEADERS_TO_REMOVE:
            assert header_to_remove.lower() not in CURRENT_HEADERS

        for header_to_add in HEADERS_TO_ADD:
            assert header_to_add["name"].lower() in CURRENT_HEADERS
