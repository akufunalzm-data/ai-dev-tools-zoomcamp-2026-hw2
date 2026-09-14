from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.assignments import router as assignments_router
from app.routers.customers import router as customers_router
from app.routers.notifications import router as notifications_router
from app.routers.tables import router as tables_router

app = FastAPI(title="TableFlow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(customers_router)
app.include_router(tables_router)
app.include_router(assignments_router)
app.include_router(notifications_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
