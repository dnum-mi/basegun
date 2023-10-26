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
        geoloc = "12.666,7.666"

        with open(path, "rb") as f:
            r = client.post(
                "/api/upload",
                files={"image": f},
                data={"date": time.time(), "geolocation": geoloc},
            )
        assert r.status_code == 200
        res = r.json()

        # checks that the json result is as expected
        assert res["label"] == "revolver"
        assert res["confidence"] == pytest.approx(98.43, 0.1)
        assert res["confidence_level"] == "high"
        # checks that the result is written in logs
        r = client.get("/api/logs")
        assert r.status_code == 200
        # checks the latest log with validates upload to object storage
        assert r.json()[0]["_bg_image_url"] == r.json()[1]["_bg_image_url"]
        assert r.json()[0]["short_message"] == "Upload successful"
        # checks the previous log "Identification request"
        log = r.json()[1]
        self.check_log_base(log)
        assert log["short_message"] == "Identification request"
        assert "-" in log["_bg_user_id"]
        assert log["_bg_geolocation"] == geoloc
        assert log["_bg_label"] == "revolver"
        assert log["_bg_confidence"] == pytest.approx(98.43, 0.1)
        assert log["_bg_upload_time"] >= 0

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
        r = client.get("/api/logs")
        assert r.status_code == 200
        log = r.json()[0]
        self.check_log_base(log)
        assert log["short_message"] == "Identification feedback"
        assert log["_bg_image_url"] == image_url
        assert log["_bg_feedback_bool"] is True
        assert log["_bg_confidence"] == confidence
        assert log["_bg_label"] == label
        assert log["_bg_confidence_level"] == confidence_level

    def test_geoloc_api(self):
        """Checks that the geolocation api works properly"""
        r = requests.get(
            "https://api.ipgeolocation.io/ipgeo?apiKey=17dc6bed199b45ca92d60079686e03f1"
        )
        res = r.json()
        assert "latitude" in res.keys()
        assert "longitude" in res.keys()
        lat = float(res["latitude"])
        assert abs(lat) < 90
        lon = float(res["longitude"])
        assert abs(lon) < 180
