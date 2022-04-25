import logging
import time
import uuid
from random import randint
from gelfformatter import GelfFormatter

formatter = GelfFormatter()

logger = logging.getLogger("Basegun")
handler = logging.FileHandler('logs/test.json')
logger.setLevel(logging.DEBUG)
handler.setFormatter(formatter)
logger.addHandler(handler)

users = [
    "xha8vrus",
    "U009cdeiz",
    "a090IXZxzno",
    "xvz9ZcUAG",
    "YYwzIEZCP"
    ]

regions = [
    "Île-de-France",
    "Gironde",
    "Provence Alpes Côte d'Azur"
]

def extra(random_int):
    return {
        "processing_time": random_int/len(users),
        "image_url": "http://"+str(uuid.uuid4())+"/s3.ovh-cloud.com",
        "user_id": users[random_int],
        "region": regions[random_int//len(regions)]
    }

while True:
    random1 = randint(0,len(users)-1)
    random2 = randint(1,10)
    if(random1==0):
        logger.error("ERROR Identification request", extra=extra(random1))
    elif(random1==1):
        logger.warning("Identification request", extra=extra(random1))
    else:
        logger.info("Identification request", extra=extra(random1))
    time.sleep(random2)
