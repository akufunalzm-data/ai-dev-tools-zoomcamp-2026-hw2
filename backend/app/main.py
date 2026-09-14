from fastapi import FastAPI

from app.routers.customers import router as customers_router

app = FastAPI(title="TableFlow API")

app.include_router(customers_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
