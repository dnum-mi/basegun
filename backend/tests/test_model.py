import pytest

from src.main import app
from src.ml.utils.typology import get_typology_from_image


class TestModel:
    def test_predict_image(self):
        """Checks the prediction of an image by the model"""
        with open("./tests/revolver.jpg", "rb") as f:
            res = get_typology_from_image(f.read())
        assert res[0] == "revolver"
        assert res[1] == pytest.approx(1, 0.1)
