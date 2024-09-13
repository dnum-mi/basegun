import jwt
import pytest
from fastapi.testclient import TestClient
from src.config import PUBLIC_KEY
from src.main import app

client = TestClient(app)

token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJvTlgya3hzM0RrdUJZNG9QY01LWnFiXzdWZVlfRmlXNEdrT1hIUjlBQkFBIn0.eyJleHAiOjE3MjU4OTM5NTcsImlhdCI6MTcyNTg5MDM1NywiYXV0aF90aW1lIjoxNzI1ODkwMzU2LCJqdGkiOiI3NjJiYzZkMy0yNWQ3LTRkMWYtYTdiYi04ZDA3MDBjOTVhZTgiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2Jhc2VndW4iLCJzdWIiOiJmYjFjNjYyNC0wMDdhLTQ2NTUtYTRiYS1kZmU1NGE2ZWE2YTAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYXNlZ3VuIiwic2lkIjoiMzM4ZGY5YmEtYmY0Yy00MmE5LTliNjEtZmU2MGY4ZDcwOTg3IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJodHRwOi8vbG9jYWxob3N0OjUxNzMiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInVzZXIiXX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJuaWdlbmQiOiIxMjM0NTY3OCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaWRwIjoicHJveHltYSIsInNlcnZpY2UiOiJETlBBRiAvIFJPSVNTWSA5NSIsIm5hbWUiOiJKYW5lIERvZSIsInBob25lX251bWJlciI6IjAxMjM0NTY3ODkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJnZW5kYXJtZXJpZSIsImdpdmVuX25hbWUiOiJKYW5lIiwiZmFtaWx5X25hbWUiOiJEb2UiLCJlbWFpbCI6ImphbmUuZG9lQGdlbmRhcm1lcmllLmdvdXYuZnIifQ.pChWFGGPU8PKSJo0IKpExrVLUCH_zfnihDcXnTb7Vx_Tfto_JCB6JV7mSguTdz5p1ZA-wWLjbSsLBH8xZ8RnGshSuLORs3bWHFPKMSO_0xurWj8S1GwF3Lf6T4mPWpVfQahlB9HWcLvT9gJTMklTRLmoktqu5cKzuyy5PSzVZeZKTHgz3BcS6cN80_frujmZcDdB3Vjl6FeuFrvXkjQSaM3XvyfzeujAEoPg7VcGfBbm3lhpzNXBjuw86RdM5PtQLn3LS4yEbsmtCsztC5MNL70ctTK2eoq2cv7drXUVO1VfpMwKQVdKZDUvzs8ApziDtsUGJUeMb8O51u1SV6DPig"


@pytest.mark.skip(reason="Cannot currently run in CI.")
class TestAuthentication:
    def test_jwks(self):
        print(PUBLIC_KEY)
        print(
            jwt.decode(
                token,
                PUBLIC_KEY,
                algorithms=["RS256"],
            )
        )
