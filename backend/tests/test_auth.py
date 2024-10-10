import logging

import jwt
import pytest
from fastapi.testclient import TestClient

from src.config import OIDC_CLIENT_ID, PUBLIC_KEY
from src.main import app
from src.utils import get_access_token

client = TestClient(app)


class TestAuthentication:
    def test_jwks(self):
        username = "gendarmerie"
        password = "password"
        client_id = "basegun"

        try:
            access_token = get_access_token(username, password, client_id)
        except Exception as e:
            pytest.fail(f"Error in obtention of JWT : {e}")

        try:
            decoded_token = jwt.decode(
                access_token,
                PUBLIC_KEY,
                audience=OIDC_CLIENT_ID,
                algorithms=["RS256"],
            )
            assert decoded_token is not None, "Decoded JWT is None."
        except jwt.InvalidTokenError as exception:
            logging.error(exception)
            pytest.fail(f"JWT Token not valid : {exception}")
