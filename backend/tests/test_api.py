import json
import os
import time

import boto3
import pytest
import requests

from src.config import S3_BUCKET_NAME, S3_URL_ENDPOINT

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
    def test_home(self, client):
        """Checks that the route / is alive"""
        response = client.get("/api/")
        assert response.text == "Basegun backend"

    def test_version(self, client):
        """Checks that the route /version sends a version"""
        response = client.get("/api/version")
        assert response.status_code == 200

    def test_upload(self, client):
        """Checks that the file upload works properly"""
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
        assert "gun_length" in res
        assert "gun_barrel_length" in res

    def test_feedback_and_logs(self, client):
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

    def test_headers(self, client):
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


class TestUpload:
    def test_revolver_without_card(self, client):
        with open("./tests/revolver.jpg", "rb") as f:
            response = client.post(
                "/api/upload",
                files={"image": f},
                data={"date": time.time()},
            )
        response.data = response.json()
        assert response.status_code == 200
        assert response.data["label"] == "revolver"
        assert response.data["confidence"] == pytest.approx(1, 0.1)
        assert response.data["confidence_level"] == "high"
        assert response.data["gun_length"] is None
        assert response.data["gun_barrel_length"] is None
        assert response.data["conf_card"] is None

    def test_semi_auto_without_card(self, client):
        with open("./tests/epaule_a_levier_sous_garde.jpg", "rb") as f:
            response = client.post(
                "/api/upload",
                files={"image": f},
                data={"date": time.time()},
            )
        response.data = response.json()
        assert response.status_code == 200
        assert response.data["label"] == "epaule_a_levier_sous_garde"
        assert response.data["confidence"] == pytest.approx(1, 0.1)
        assert response.data["confidence_level"] == "high"
        assert response.data["gun_length"] is not None
        assert response.data["gun_barrel_length"] is not None
        assert response.data["conf_card"] is not None


class TestExpertContact:
    def test_success(self, faker, client):
        client.authenticate()
        with open("./tests/revolver.jpg", "rb") as f:
            response = client.post(
                "/api/expert-contact",
                files=[
                    ("files", ("right_picture", f)),
                    ("files", ("left_picture", f)),
                    ("files", ("markings_picture", f)),
                ],
                data={
                    "firstname": faker.first_name(),
                    "lastname": faker.last_name(),
                    "nigend": faker.pystr(),
                    "service": faker.pystr(),
                    "phone": faker.pystr(),
                    "email": faker.pystr(),
                    "seizure": faker.pystr(),
                    "una_or_procedure_number": faker.pystr(),
                    "gun_type": faker.pystr(),
                    "gun_length": faker.pyint(),
                    "gun_barrel_length": faker.pyint(),
                    "markings_description": faker.pystr(),
                },
            )

        response.data = response.json()
        assert response.status_code == 200

    def test_403(self, client):
        response = client.post("/api/expert-contact")
        response.data = response.json()
        assert response.status_code == 403


class TestExpertDetails:
    def test_success(self, client):
        client.authenticate()
        response = client.get("/api/contact-details")
        response.data = response.json()
        assert response.status_code == 200

    def test_403(self, client):
        response = client.get("/api/contact-details")
        response.data = response.json()
        assert response.status_code == 403
