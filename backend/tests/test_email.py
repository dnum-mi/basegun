from fastapi.testclient import TestClient

from src.main import app
from src.utils import send_mail

client = TestClient(app)


class TestEmail:
    def test_email(self):
        send_mail(
            subject="Demande d'avis à un expert",
            to="maildelircgn@interieur.gouv.fr",
            message="Message de test",
        )
