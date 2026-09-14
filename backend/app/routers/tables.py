from fastapi import APIRouter

from app.schemas import RestaurantTable
from app.store import store

router = APIRouter(prefix="/api/tables", tags=["tables"])


@router.get("", response_model=list[RestaurantTable])
def list_tables() -> list[RestaurantTable]:
    return [RestaurantTable.model_validate(table) for table in store.tables]
