from src.utils import send_mail


class TestEmail:
    def test_email(self):
        send_mail(
            subject="Demande d'avis à un expert",
            to="maildelircgn@interieur.gouv.fr",
            message="Message de test",
        )
