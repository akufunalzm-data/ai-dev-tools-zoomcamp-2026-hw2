from fastapi import FastAPI

from app.routers.customers import router as customers_router
from app.routers.tables import router as tables_router

app = FastAPI(title="TableFlow API")

app.include_router(customers_router)
app.include_router(tables_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
