import sys
import unittest
import os
import requests
from PIL import Image, ImageChops
from src.main import PATH_IMGS

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

    def test_upload(self):
        """Checks that the file upload works properly"""
        path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "revolver.jpg")
        with open(path, 'rb') as f:
            r = requests.post(self.url + "/upload", files={"image": f})
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
