import jwt
import pytest
from fastapi.testclient import TestClient
from src.config import PUBLIC_KEY
from src.main import app

client = TestClient(app)

token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItWmVZS3ZiMFEwdmJyZ2tEc2I5Rk5YLTU3QkdEMjNxRWhnUE1kdERHNUY4In0.eyJleHAiOjE3MjE3Mzc5ODksImlhdCI6MTcyMTczNzA4OSwiYXV0aF90aW1lIjoxNzIxNzM2ODk4LCJqdGkiOiI0NTkxMzI5Zi02YjIzLTQxYmMtYjU4Yy03ZmM3NjFhYjIzMzgiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJtYXN0ZXItcmVhbG0iLCJhY2NvdW50Il0sInN1YiI6IjQ2YTUzMDM1LWExZGMtNDExOS1hZmYwLTM0NDY5OTJkMzFiOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJhc2VndW4iLCJzaWQiOiI5M2RlZjg3My1lZTIxLTRhY2YtOTI4Ny03N2UwNzA3OTcxODEiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiY3JlYXRlLXJlYWxtIiwiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJtYXN0ZXItcmVhbG0iOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.hU0hJgMQayorct84UK9jiXDWOoBZ2KgmGa-JK0OOvn5Dfq0i_uZEOwzSjNwsvsYjX5NtHRrVBIxIcYzD-6IubUB2eUk7dgbYTqcVyjkWFrjwuv6ieTYvk-OuUg5iCXSe67ZbFuQwvNCg_8ns3JhEAEgHD4mLmhkPDlln4FkK605vAGZ5bDDYuPbaBI3ao4zpFr837r8zP5BGnzsclzk-T9k03pbTZ2aIv3PqlhfBVl2rKM0KYYKL8n3zLvObFMnZSx22-AuTPKKxkv3IrpCX2Zr_pAv-Bb2dw9LfEy_jxKv1i175Awjy3ayLbltvMcRzDTEzZ7YdBiuKoGoYjdoHng"


@pytest.mark.skip(reason="Cannot currently run in CI.")
class TestAuthentication:
    def test_jwks(self):
        print(
            jwt.decode(
                token,
                PUBLIC_KEY,
                algorithms=["RS256"],
                audience=["master-realm", "account"],
            )
        )
