from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException, status

from app.schemas import Customer, CustomerCreate, CustomerStatus, CustomerStatusUpdate
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


@router.patch("/{customer_id}/status", response_model=Customer)
def update_customer_status(
    customer_id: str,
    status_update: CustomerStatusUpdate,
) -> Customer:
    customer = next(
        (customer for customer in store.customers if customer["id"] == customer_id),
        None,
    )
    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )

    current_status = CustomerStatus(customer["status"])
    valid_next_status = {
        CustomerStatus.WAITING: CustomerStatus.NOTIFIED,
        CustomerStatus.NOTIFIED: CustomerStatus.SEATED,
        CustomerStatus.SEATED: CustomerStatus.COMPLETED,
    }.get(current_status)

    if status_update.status != valid_next_status:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                f"Invalid status transition from {current_status.value} "
                f"to {status_update.status.value}"
            ),
        )

    customer["status"] = status_update.status.value
    return Customer.model_validate(customer)
