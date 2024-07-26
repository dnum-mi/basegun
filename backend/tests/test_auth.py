import jwt
import pytest
from fastapi.testclient import TestClient
from src.config import PUBLIC_KEY
from src.main import app

client = TestClient(app)

token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFYUxsTVlreWVOal93M19Ub0phajZ1OWdQc241M1dtM1JTQkNPeFdjdnVrIn0.eyJleHAiOjE3MjIwMDU0NzIsImlhdCI6MTcyMjAwNTQxMiwiYXV0aF90aW1lIjoxNzIyMDA1NDExLCJqdGkiOiJlNTZjZjU1OS03ZWEwLTQxOWEtOTE4OS00YmQ5MDk0MzYxMGYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2Jhc2VndW4iLCJhdWQiOiJtYXN0ZXItcmVhbG0iLCJzdWIiOiIyMWE1YTk3Ni1lYzYwLTQ5MjEtYmYzOC02YjU1MzMyMTcwYzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYXNlZ3VuIiwic2lkIjoiNWIxMTI3MjctMmFhNC00MTA5LWJhNTAtYjZmOTBjYjc5ZDQ3IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJodHRwOi8vbG9jYWxob3N0OjUxNzMiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImNyZWF0ZS1yZWFsbSIsImFkbWluIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.fbRu9uOlu4TufhdSyqesyGBESPjQHIF0p9ZH-4XBGoVzA4OWZkPAN0ypdQk5TIFXF58mMQV-LYTFzTeBGZGwRmorbjsKIFxYEuf2a7CN40H5Ek92c-puo0laeqP4x3UgcN_2pQDGv9MjjAdid63U8xZY59pQ59Gy9e3hUnJ1R3cVyXDAwcqelS-V6NatezdNXSkQjIYMqoAjd1C9YOFbqJh_zLr6ilhuY8srQN36eWu3dtji_okBoWE8GLWAkp1We_1LUpISnS3nn6ZrleQ2K01PEcknHwLS36F-zDl0Tc-2_pL__mdRvDt3CvAlUkWTTvp_4orMKMqaId3J9QsWTg"


@pytest.mark.skip(reason="Cannot currently run in CI.")
class TestAuthentication:
    def test_jwks(self):
        print(PUBLIC_KEY)
        print(
            jwt.decode(
                token,
                PUBLIC_KEY,
                algorithms=["RS256"],
                audience=["master-realm", "account"],
            )
        )
