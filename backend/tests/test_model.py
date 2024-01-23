import os

import pytest
from src.model import CLASSES, load_model_inference, predict_image
from src.main import app

class TestModel:
    def test_predict_image(self):
        """Checks the prediction of an image by the model"""
        with open("./tests/revolver.jpg", "rb") as f:
            res = predict_image(app.model, f.read())
        assert res[0] == "revolver"
        assert res[1] == pytest.approx(1, 0.1)
