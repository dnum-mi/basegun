from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from .config import HEADERS
from .router import router

app = FastAPI(docs_url="/api/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("OWASPHeadersMiddleware")
async def add_owasp_middleware(request: Request, call_next):
    response = await call_next(request)
    for header in HEADERS:
        response.headers[header["name"]] = header["value"]
    return response


app.include_router(router)
