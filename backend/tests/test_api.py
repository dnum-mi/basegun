import unittest
import os
import time
from io import BytesIO
import requests
from PIL import Image, ImageChops


class TestModel(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(TestModel, self).__init__(*args, **kwargs)
        self.url = "http://localhost:8000"

    def test_home(self):
        """Checks that the route / is alive"""
        r = requests.get(self.url)
        self.assertEqual(r.text, "Basegun backend")

    def test_version(self):
        """Checks that the route /version sends a version"""
        r = requests.get(self.url + '/version')
        self.assertNotEqual(r.text, "-1")
        self.assertEqual(len(r.text.split('.')), 2) # checks version has format X.Y

    def check_log_base(self, log):
        self.assertTrue(
            {'timestamp', 'version', 'host', 'level', 'short_message', '_bg_date', '_bg_user_id',
                '_bg_device', '_bg_device_os', '_bg_device_family', '_bg_device_browser', '_bg_version',
                '_bg_model'}.issubset(set(log.keys()))
        )
        self.assertEqual(log["level"], 6)
        self.assertTrue(log["_bg_model"].startswith("EffB"))

    def test_upload_and_logs(self):
        """Checks that the file upload works properly"""
        path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "revolver.jpg")
        geoloc = "12.666,7.666"

        self.assertTrue("OS_USERNAME" in os.environ)
        with open(path, 'rb') as f:
            r = requests.post(self.url + "/upload",
                files={"image": f},
                data={"date": time.time(), "geolocation": geoloc})
        self.assertEqual(r.status_code, 200)
        res = r.json()

        # checks that the json result is as expected
        self.assertEqual(res["label"], "revolver")
        self.assertAlmostEqual(res["confidence"], 98.43, places=1)
        self.assertTrue(res["confidence_level"], "high")
        self.assertTrue("ovh" in res["path"])
        # checks that written file is exactly the same as input file
        time.sleep(10)
        response = requests.get(res["path"])
        with Image.open(path) as image_one:
            with Image.open(BytesIO(response.content)) as image_two:
                self.assertEqual(image_one.size, image_two.size)
                diff = ImageChops.difference(image_one, image_two)
                self.assertFalse(diff.getbbox())

    def test_feedback_and_logs(self):
        """Checks that the feedback works properly"""
        confidence = 90
        label = "revolver"
        confidence_level = "high"
        image_url = "https://storage.gra.cloud.ovh.net/v1/test"
        r = requests.post(self.url + "/identification-feedback",
                json={"image_url": image_url, "feedback": True, "confidence": confidence, "label": label, "confidence_level": confidence_level})
        self.assertEqual(r.status_code, 200)

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