import os

import pytest
from src.model import CLASSES, load_model_inference, predict_image


class TestModel:
    model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../model.pt")
    assert os.path.exists(model_path)
    model = load_model_inference(model_path)

    def test_predict_image(self):
        """Checks the prediction of an image by the model"""
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "revolver.jpg")
        with open(path, "rb") as f:
            res = predict_image(self.model, f.read())
        assert res[0] == "revolver"
        assert res[1] == pytest.approx(1, 0.1)
