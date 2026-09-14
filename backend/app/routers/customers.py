from fastapi import APIRouter

from app.schemas import Customer
from app.store import store

router = APIRouter(prefix="/api/customers", tags=["customers"])


@router.get("", response_model=list[Customer])
def list_customers() -> list[Customer]:
    return [Customer.model_validate(customer) for customer in store.customers]
