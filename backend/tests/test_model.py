import sys
import unittest
import os
import numpy as np

from src.model import load_model_inference, test_image, CLASSES


class TestModel(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(TestModel, self).__init__(*args, **kwargs)
        self.model_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "../src/weights/model.pth")
        self.assertTrue(os.path.exists(self.model_path))
        self.model = load_model_inference(self.model_path)

        # self.image_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)),"images")
        # if not os.path.exists(self.image_dir):
        #     os.makedirs(self.image_dir)


    def test_is_efficientnet(self):
        """Checks that the loaded model is an efficientnet"""
        self.assertTrue("efficientnet" in self.model.__class__.__name__.lower())
        self.assertTrue(len(self.model.features), 8)
        self.assertEqual(len(self.model.classifier), 2)

