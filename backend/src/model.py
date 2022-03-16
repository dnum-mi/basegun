import os
from PIL import Image
from torch import Tensor
import numpy as np
import torch
import torchvision.models as Model
from torchvision import transforms


CLASSES = ['autre_epaule', 'autre_pistolet', 'epaule_a_levier_sous_garde',
        'epaule_a_percussion_silex', 'epaule_a_pompe', 'epaule_a_un_coup', 'epaule_a_verrou',
        'pistolet_a_percussion_silex', 'pistolet_semi_auto_moderne', 'revolver']

MODEL_TORCH = Model.efficientnet_b7
INPUT_SIZE = 600
device = torch.device('cpu')


class ConvertRgb(object):
    """Converts an image to RGB
    """

    def __init__(self):
        pass

    def __call__(self, image):
        if image.mode != 'RGB':
            image = image.convert('RGB')
        return image


class Rescale(object):
    """Rescale the image in a sample to a given size while keeping ratio

    Args:
        output_size (int): Desired output size. The largest of image edges is matched
            to output_size keeping aspect ratio the same.
    """

    def __init__(self, output_size):
        assert isinstance(output_size, int)
        self.output_size = output_size

    def __call__(self, image):
        w, h = image.size
        if w > h:
            new_h, new_w = self.output_size * h / w, self.output_size
        else:
            new_h, new_w = self.output_size, self.output_size * w / h
        new_h, new_w = int(new_h), int(new_w)
        return transforms.functional.resize(image, (new_h, new_w))


class RandomPad(object):
    """Pad an image to reach a given size

    Args:
        output_size (int): Desired output size. We pad all edges
                        symmetrically to reach a size x size image.
    """

    def __init__(self, output_size):
        assert isinstance(output_size, int)
        self.output_size = output_size

    def __call__(self, image):
        w, h = image.size
        pads = {'horiz': [self.output_size - w,0,0],
        'vert': [self.output_size - h,0,0]}
        if pads['horiz'][0] >= 0 and pads['vert'][0] >= 0:
            for direction in ['horiz', 'vert'] :
                pads[direction][1] = pads[direction][0] // 2
                if pads[direction][0] % 2 == 1: # if the size to pad is odd, add a random +1 on one side
                    pads[direction][1] += np.random.randint(0,1)
                pads[direction][2] = pads[direction][0] - pads[direction][1]

            return transforms.functional.pad(image,
                [pads['horiz'][1], pads['vert'][1], pads['horiz'][2], pads['vert'][2]],
                fill = int(np.random.choice([0, 255])) # border randomly white or black
            )
        else:
            return image


def build_model(model: Model) -> Model:
    # freeze first layers
    for param in model.parameters():
        param.requires_grad = False
    # Parameters of newly constructed modules have requires_grad=True by default
    num_ftrs = model.classifier[1].in_features
    # to try later : add batch normalization and dropout
    model.classifier[1] = torch.nn.Linear(num_ftrs, len(CLASSES))
    model = model.to(device)
    return model


def load_model_inference(state_dict_path: str) -> Model:
    model = build_model(MODEL_TORCH())
    # Initialize model with the pretrained weights
    model.load_state_dict(torch.load(state_dict_path, map_location=device)['model_state_dict'])
    model.to(device)
    # set the model to inference mode
    model.eval()
    return model


loader =  transforms.Compose([
            ConvertRgb(),
            Rescale(INPUT_SIZE),
            RandomPad(INPUT_SIZE),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])


def test_image(model, path):
    im = Image.open(path)
    image = loader(im).float()
    image = image.unsqueeze(0).to(device)
    output = model(image)
    probs = torch.nn.functional.softmax(output, dim=1).detach().numpy()[0]
    res = [(CLASSES[i], round(probs[i]*100,2)) for i in range(len(CLASSES))]
    res.sort(key=lambda x:x[1], reverse=True)
    return res[0]
