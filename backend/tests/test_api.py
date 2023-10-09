import unittest
import os
import time
import boto3
import json

from io import BytesIO
import requests
from PIL import Image, ImageChops
from src.main import app, S3_BUCKET_NAME, S3_URL_ENDPOINT

from fastapi import FastAPI
from fastapi.testclient import TestClient



client = TestClient(app)

BUCKET_POLICY = {
    'Version': '2012-10-17',
    'Statement': [{
        'Sid': 'AddPerm',
        'Effect': 'Allow',
        'Principal': '*',
        'Action': ['s3:GetObject'],
        'Resource': f"arn:aws:s3:::{S3_BUCKET_NAME}/*"
    }]
}


def create_bucket():
    s3 = boto3.resource("s3", endpoint_url=S3_URL_ENDPOINT)
    bucket = s3.Bucket(S3_BUCKET_NAME)
    if bucket.creation_date is None:
        bucket.create()
        bucket.Policy().put(Policy=json.dumps(BUCKET_POLICY))


class TestModel(unittest.TestCase):
    def test_home(self):
        """Checks that the route / is alive"""
        response = client.get("/")
        self.assertEqual(response.text, "Basegun backend")

    def test_version(self):
        """Checks that the route /version sends a version"""
        response = client.get("/version")
        self.assertEqual(response.status_code, 200)

    def check_log_base(self, log):
        self.assertTrue(
            {'timestamp', 'version', 'host', 'level', 'short_message', '_bg_date', '_bg_user_id',
                '_bg_device', '_bg_device_os', '_bg_device_family', '_bg_device_browser', '_bg_version',
                '_bg_model'}.issubset(set(log.keys()))
        )
        self.assertEqual(log["level"], 6)
        self.assertTrue(log["_bg_model"].startswith("EffB"))

    def test_upload(self):
        """Checks that the file upload works properly"""
        if os.environ["WORKSPACE"]=="dev":
            create_bucket()
        path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "revolver.jpg")
        geoloc = "12.666,7.666"

        with open(path, 'rb') as f:
            r = client.post("/upload",
                files={"image": f},
                data={"date": time.time(), "geolocation": geoloc})
        self.assertEqual(r.status_code, 200)
        res = r.json()

        # checks that the json result is as expected
        self.assertEqual(res["label"], "revolver")
        self.assertAlmostEqual(res["confidence"], 98.43, places=1)
        self.assertTrue(res["confidence_level"], "high")
        # checks that the result is written in logs
        r = client.get("/logs")
        self.assertEqual(r.status_code, 200)
        # checks the latest log with validates upload to object storage
        self.assertEqual(r.json()[0]["_bg_image_url"], r.json()[1]["_bg_image_url"])
        self.assertEqual(r.json()[0]["short_message"], "Upload successful")
        # checks the previous log "Identification request"
        log = r.json()[1]
        self.check_log_base(log)
        self.assertEqual(log["short_message"], "Identification request")
        self.assertTrue("-" in log["_bg_user_id"])
        self.assertEqual(log["_bg_geolocation"], geoloc)
        self.assertEqual(log["_bg_label"], "revolver")
        self.assertAlmostEqual(log["_bg_confidence"], 98.43, places=1)
        self.assertTrue(log["_bg_upload_time"]>=0)

    def test_feedback_and_logs(self):
        """Checks that the feedback works properly"""
        confidence = 90
        label = "revolver"
        confidence_level = "high"
        image_url = "https://storage.gra.cloud.ovh.net/v1/test"
        r = client.post("/identification-feedback",
                json={"image_url": image_url, "feedback": True, "confidence": confidence, "label": label, "confidence_level": confidence_level})

        self.assertEqual(r.status_code, 200)
        r = client.get("/logs")
        self.assertEqual(r.status_code, 200)
        log = r.json()[0]
        self.check_log_base(log)
        self.assertEqual(log["short_message"], "Identification feedback")
        self.assertEqual(log["_bg_image_url"], image_url)
        self.assertTrue(log["_bg_feedback_bool"])
        self.assertEqual(log["_bg_confidence"], confidence)
        self.assertEqual(log["_bg_label"], label)
        self.assertEqual(log["_bg_confidence_level"], confidence_level)

    def test_geoloc_api(self):
        """Checks that the geolocation api works properly"""
        r = requests.get("https://api.ipgeolocation.io/ipgeo?apiKey=17dc6bed199b45ca92d60079686e03f1")
        res = r.json()
        self.assertTrue("latitude" in res.keys())
        self.assertTrue("longitude" in res.keys())
        lat = float(res["latitude"])
        self.assertTrue(abs(lat) < 90)
        lon = float(res["longitude"])
        self.assertTrue(abs(lon) < 180)