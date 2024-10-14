import pytest
from fastapi.testclient import TestClient

from src.config import OIDC_CLIENT_ID
from src.main import app
from src.utils import get_access_token


class AuthenticableTestClient(TestClient):
    def __init__(self, app):
        super().__init__(app)

    def authenticate(self, username="gendarmerie", password="password"):
        token = get_access_token(username, password, OIDC_CLIENT_ID)
        self.headers["Authorization"] = f"Bearer {token}"


@pytest.fixture
def client():
    return AuthenticableTestClient(app)
