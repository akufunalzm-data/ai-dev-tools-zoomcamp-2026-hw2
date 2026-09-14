from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter

from app.schemas import Customer, CustomerCreate, CustomerStatus
from app.store import store

router = APIRouter(prefix="/api/customers", tags=["customers"])


@router.get("", response_model=list[Customer])
def list_customers() -> list[Customer]:
    return [Customer.model_validate(customer) for customer in store.customers]


@router.post("", response_model=Customer, status_code=201)
def create_customer(customer_create: CustomerCreate) -> Customer:
    customer = {
        "id": f"customer-{uuid4().hex}",
        "name": customer_create.name,
        "party_size": customer_create.party_size,
        "phone_number": customer_create.phone_number,
        "status": CustomerStatus.WAITING.value,
        "created_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }
    store.customers.append(customer)
    return Customer.model_validate(customer)
