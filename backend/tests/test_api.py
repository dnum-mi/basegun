import unittest
import os
import time
import json
import requests
from PIL import Image, ImageChops
from src.main import PATH_IMGS, PATH_LOGS

class TestModel(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(TestModel, self).__init__(*args, **kwargs)
        self.url = "http://localhost:5000"
        self.assertTrue(os.path.exists(PATH_IMGS))

    def test_home(self):
        """Checks that the route / is alive"""
        r = requests.get(self.url)
        self.assertEqual(r.text, "Basegun backend")

    def test_version(self):
        """Checks that the route /version sends a version"""
        self.assertTrue("VERSION" in os.environ)
        r = requests.get(self.url + '/version')
        self.assertEqual(r.text, os.environ["VERSION"])
        self.assertEqual(len(r.text.split('.')), 2) # checks version has format X.Y

    def test_logs(self):
        """Checks that the route /logs is alive"""
        test_json = {"version": "1.1", "short_message": "test"}
        with open(PATH_LOGS, 'a') as log_file:
            log_file.write(json.dumps(test_json)+'\n')
        r = requests.get(self.url + "/logs")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()[-1], test_json)

    def test_upload(self):
        """Checks that the file upload works properly"""
        path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "revolver.jpg")
        user, geoloc = ("2ea26", "12.666,7.666")

        with open(path, 'rb') as f:
            r = requests.post(self.url + "/upload",
                files={"image": f},
                data={"date": time.time(), "userId": user, "geolocation": geoloc})
        res = r.json()

        # checks that the input file has been written
        self.assertTrue("file_name" in res.keys())
        output_path = os.path.join(PATH_IMGS, res["file_name"])
        self.assertTrue(os.path.exists(output_path))
        # checks that written file is exactly the same as input file
        with Image.open(path) as image_one:
            with Image.open(output_path) as image_two:
                self.assertEqual(image_one.size, image_two.size)
                diff = ImageChops.difference(image_one, image_two)
                self.assertFalse(diff.getbbox())
        # checks that the json result is as expected
        self.assertTrue("label" in res.keys())
        self.assertEqual(res["label"], "revolver")
        self.assertTrue("confidence" in res.keys())
        self.assertAlmostEqual(res["confidence"], 99.05, places=1)
        # checks that the result is written in logs
        r = requests.get(self.url + "/logs")
        log = r.json()[-1]
        self.assertEqual(
            set(log.keys()),
            {'timestamp', '_bg_device', 'host', '_bg_model_time', 'version', '_bg_device_os', '_bg_device_family',
            'short_message', '_bg_confidence', '_bg_upload_time', '_bg_date', '_bg_user_id', '_bg_label', '_bg_image_url',
            'level', '_bg_geolocation', '_bg_device_browser'}
        )
        self.assertEqual(log["version"], "1.1")
        self.assertEqual(log["level"], 6)
        self.assertEqual(log["_user_id"], user)
        self.assertEqual(log["_geolocation"], geoloc)
        self.assertTrue(log["_upload_time"]>=0)
