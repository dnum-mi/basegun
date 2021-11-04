from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# allow requests from front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return "Hello, World!"