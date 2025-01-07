import time

from locust import HttpUser, task


class TestLocust(HttpUser):
    @task
    def rate_limit_version(self):
        self.client.get("/version")

    @task
    def test_upload(self):
        with open("./tests/images/revolver.jpg", "rb") as f:
            self.client.post(
                "/upload",
                files={"image": f},
                data={"date": time.time()},
            )
