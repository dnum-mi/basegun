from io import BytesIO
from typing import Union

import numpy as np
from PIL import Image
from ultralytics import YOLO

CLASSES = [
    "autre_pistolet",
    "epaule_a_levier_sous_garde",
    "epaule_a_pompe",
    "epaule_a_un_coup_par_canon",
    "epaule_a_verrou",
    "epaule_mecanisme_ancien",
    "epaule_semi_auto_style_chasse",
    "epaule_semi_auto_style_militaire_milieu_20e",
    "pistolet_mecanisme_ancien",
    "pistolet_semi_auto_moderne",
    "revolver",
    "semi_auto_style_militaire_autre",
]


def load_model_inference(model_path: str):
    """Load model structure and weights

    Args:
        model_path (str): path to model (.pt file)

    Returns:
        Model: loaded model ready for prediction and Warm-up
    """
    return YOLO(model_path)


def predict_image(model, img: bytes) -> Union[str, float]:
    """Run the model prediction on an image

    Args:
        model (Model): classification model
        img (bytes): input image in bytes

    Returns:
        Union[str, float]: (label, confidence) of best class predicted
    """
    im = Image.open(BytesIO(img))
    results = model(im, verbose=False)
    predicted_class = results[0].probs.top5[0]
    label = CLASSES[predicted_class]
    confidence = float(results[0].probs.top5conf[0])
    return (label, confidence)
