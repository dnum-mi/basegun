import unittest
import os
import time
from io import BytesIO
import requests
from PIL import Image, ImageChops

class TestModel(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(TestModel, self).__init__(*args, **kwargs)
        self.url = "http://localhost:5000"

    def test_home(self):
        """Checks that the route / is alive"""
        r = requests.get(self.url)
        self.assertEqual(r.text, "Basegun backend")

    def test_version(self):
        """Checks that the route /version sends a version"""
        r = requests.get(self.url + '/version')
        self.assertNotEqual(r.text, "-1")
        self.assertEqual(len(r.text.split('.')), 2) # checks version has format X.Y

    def test_upload_and_logs(self):
        """Checks that the file upload works properly"""
        path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "revolver.jpg")
        user, geoloc = ("2ea26", "12.666,7.666")

        with open(path, 'rb') as f:
            r = requests.post(self.url + "/upload",
                files={"image": f},
                data={"date": time.time(), "userId": user, "geolocation": geoloc})
        self.assertEqual(r.status_code, 200)
        res = r.json()

        # checks that the json result is as expected
        self.assertEqual(set(res.keys()), set({"label", "confidence", "confidence_level", "file"}))
        self.assertEqual(res["label"], "revolver")
        self.assertAlmostEqual(res["confidence"], 99.05, places=1)
        self.assertTrue(res["confidence_level"], "high")
        # checks that written file is exactly the same as input file
        self.assertTrue("ovh" in res["file"])
        response = requests.get(res["file"])
        with Image.open(path) as image_one:
            with Image.open(BytesIO(response.content)) as image_two:
                self.assertEqual(image_one.size, image_two.size)
                diff = ImageChops.difference(image_one, image_two)
                self.assertFalse(diff.getbbox())
        # checks that the result is written in logs
        r = requests.get(self.url + "/logs")
        self.assertEqual(r.status_code, 200)
        log = r.json()[0]
        self.assertEqual(
            set(log.keys()),
            set({'timestamp', '_bg_device', 'host', '_bg_model_time', 'version', '_bg_device_os', '_bg_device_family',
            'short_message', '_bg_confidence', '_bg_confidence_level', '_bg_upload_time', '_bg_date', '_bg_user_id', '_bg_label', '_bg_image_url',
            'level', '_bg_geolocation', '_bg_device_browser', '_bg_version', '_bg_model'})
        )
        self.assertEqual(log["level"], 6)
        self.assertEqual(log["short_message"], "Identification request")
        self.assertEqual(log["_bg_user_id"], user)
        self.assertEqual(log["_bg_geolocation"], geoloc)
        self.assertTrue(log["_bg_upload_time"]>=0)

    def test_feedback_and_logs(self):
        """Checks that the feedback works properly"""
        r = requests.post(self.url + "/feedback",
                json={"image_url": "test", "feedback": False})
        self.assertEqual(r.status_code, 200)
        r = requests.get(self.url + "/logs")
        self.assertEqual(r.status_code, 200)
        res = r.json()
        log = r.json()[0]
        self.assertEqual(log["level"], 6)
        self.assertEqual(log["short_message"], "Identification feedback")
        self.assertEqual(log["_bg_image_url"], "test")
        self.assertFalse(log["_bg_feedback_bool"])
