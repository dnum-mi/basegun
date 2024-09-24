import jwt
import pytest
from fastapi.testclient import TestClient
from src.config import PUBLIC_KEY
from src.main import app

client = TestClient(app)

token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiYXNlZ3VuIn0.eyJleHAiOjE3MjcxODk4NzcsImlhdCI6MTcyNzE4NjI3NywiYXV0aF90aW1lIjoxNzI3MTg2Mjc2LCJqdGkiOiIwNTA4YjNlNS1lMjg1LTRhNjctYTk0ZS02NmNlNzZkMDc2MjciLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2Jhc2VndW4iLCJzdWIiOiI1YTBhYmM4Yi0zMzMzLTQyNzAtOWViMi05ZDc4ZGQ2MzIzZDkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYXNlZ3VuIiwic2lkIjoiNjhhMzE5OTMtMzcxZi00NDBiLWI5NjgtYjc1MDU0ZGVlMDdiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJodHRwOi8vbG9jYWxob3N0OjUxNzMiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInVzZXIiXX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJuaWdlbmQiOiIxMjM0NTY3OCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaWRwIjoicHJveHltYSIsInNlcnZpY2UiOiJETlBBRiAvIFJPSVNTWSA5NSIsIm5hbWUiOiJKYW5lIERvZSIsInBob25lX251bWJlciI6IjAxMjM0NTY3ODkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJnZW5kYXJtZXJpZSIsImZhbWlseV9uYW1lIjoiRG9lIiwiZmlyc3RfbmFtZSI6IkphbmUiLCJlbWFpbCI6ImphbmUuZG9lQGdlbmRhcm1lcmllLmdvdXYuZnIifQ.WQML9ujg31dsfJJhfuO5aisL3Mmp6LmmDcB7tXiR_bjdU-0SFKnKQN48ORPlZEtj-s1hlgR69UU4Z0whe5w1JUdNkgrocngjcGUNYueb4Z4kfIDBYExDE4y4UvLZ1vgUw3sDK1laRBI4fG_CAkUUNA85rTPIOaAlrhRYXyizX3mglwg-ibm6HUZjLelcZW2lkvdhOD-dlkNdPVywa0dOBh3Awhn3KS6At3GDlsf0v_JCNzS3p1i_XHIEYNai0jEBSOQjkjjF0FZtIDhN1Nl3mE6wtVs1s83PYaIGTLN29WqdZCudeVTrR3x1_RIkIEVEANUNJvE5QYsl6mRPDABdAA"


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
