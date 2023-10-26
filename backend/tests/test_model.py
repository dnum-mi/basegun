import os

import numpy as np
import pytest
from PIL import Image
from src.model import (
    CLASSES,
    INPUT_SIZE,
    load_model_inference,
    predict_image,
    prepare_input,
)
from torch import Tensor


class TestModel:
    model_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "../src/weights/model.pth"
    )
    assert os.path.exists(model_path)
    model = load_model_inference(model_path)

    def test_is_efficientnet(self):
        """Checks that the loaded model is an efficientnet"""
        assert "efficientnet" in self.model.__class__.__name__.lower()
        assert len(self.model.features) == 9
        assert len(self.model.classifier) == 2

    def test_model_correctly_built(self):
        """Checks that the model is correctly built for prediction"""
        # check number of classes
        assert self.model.classifier[1].out_features == len(CLASSES)
        # check model in "eval" mode
        assert self.model.training is False
        # check model on cpu
        assert next(self.model.parameters()).is_cuda is False

    def test_prepare_input(self):
        """Checks prepare_input works properly"""
        # create random RGBA image
        image = Image.fromarray((np.random.rand(100, 200, 4) * 255).astype("uint8"))
        image = prepare_input(image)
        assert type(image) == Tensor
        # checks converted to 3 channels
        assert image.size(dim=1) == 3
        # checks image resized to INPUT_SIZE x INPUT_SIZE
        assert image.size() == (1, 3, INPUT_SIZE, INPUT_SIZE)

    def test_predict_image(self):
        """Checks the prediction of an image by the model"""
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "revolver.jpg")
        with open(path, "rb") as f:
            res = predict_image(self.model, f.read())
        assert res[0] == "revolver"
        assert res[1] == pytest.approx(98.43, 0.1)
