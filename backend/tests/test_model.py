import os
import sys
import unittest

import numpy as np
from PIL import Image
from src.model import (
    CLASSES,
    INPUT_SIZE,
    load_model_inference,
    predict_image,
    prepare_input,
)
from torch import Tensor


class TestModel(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(TestModel, self).__init__(*args, **kwargs)
        self.model_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "../src/weights/model.pth"
        )
        self.assertTrue(os.path.exists(self.model_path))
        self.model = load_model_inference(self.model_path)

    def test_is_efficientnet(self):
        """Checks that the loaded model is an efficientnet"""
        self.assertTrue("efficientnet" in self.model.__class__.__name__.lower())
        self.assertTrue(len(self.model.features), 8)
        self.assertEqual(len(self.model.classifier), 2)

    def test_model_correctly_built(self):
        """Checks that the model is correctly built for prediction"""
        # check number of classes
        self.assertEqual(self.model.classifier[1].out_features, len(CLASSES))
        # check model in "eval" mode
        self.assertFalse(self.model.training)
        # check model on cpu
        self.assertFalse(next(self.model.parameters()).is_cuda)

    def test_prepare_input(self):
        """Checks prepare_input works properly"""
        # create random RGBA image
        image = Image.fromarray((np.random.rand(100, 200, 4) * 255).astype("uint8"))
        image = prepare_input(image)
        self.assertEqual(type(image), Tensor)
        # checks converted to 3 channels
        self.assertEqual(image.size(dim=1), 3)
        # checks image resized to INPUT_SIZE x INPUT_SIZE
        self.assertEqual(image.size(), (1, 3, INPUT_SIZE, INPUT_SIZE))

    def test_predict_image(self):
        """Checks the prediction of an image by the model"""
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "revolver.jpg")
        with open(path, "rb") as f:
            res = predict_image(self.model, f.read())
        self.assertEqual(res[0], "revolver")
        self.assertAlmostEqual(res[1], 98.43, places=1)
