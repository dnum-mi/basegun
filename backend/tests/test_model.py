import pytest
from src.main import app
from src.ml.measure.measure import get_lengths_from_image
from src.ml.utils.typology import get_typology_from_image


class TestModels:
    def test_get_typology_from_image(self):
        with open("./tests/revolver.jpg", "rb") as f:
            label, confidence = get_typology_from_image(f.read())
        assert label == "revolver"
        assert confidence == pytest.approx(1, 0.1)

    def test_get_lengths_from_image(self):
        with open("./tests/revolver.jpg", "rb") as f:
            gun_length, barrel_length, _ = get_lengths_from_image(f.read())
        assert gun_length == pytest.approx(119.1, 0.1)
        assert barrel_length == pytest.approx(61.54, 0.1)
