from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from .config import HEADERS
from .router import router

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(docs_url="/api/docs")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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
