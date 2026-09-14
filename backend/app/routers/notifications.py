from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status

from app.schemas import NotificationCreate, SimulatedNotification
from app.store import store

router = APIRouter(prefix="/api/notifications", tags=["notifications"])


@router.get("", response_model=list[SimulatedNotification])
def list_notifications() -> list[SimulatedNotification]:
    return [
        SimulatedNotification.model_validate(notification)
        for notification in store.notifications
    ]


@router.post("", response_model=SimulatedNotification, status_code=201)
def create_notification(notification_create: NotificationCreate) -> SimulatedNotification:
    customer = next(
        (
            customer
            for customer in store.customers
            if customer["id"] == notification_create.customer_id
        ),
        None,
    )
    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )

    table = next(
        (table for table in store.tables if table["id"] == notification_create.table_id),
        None,
    )
    if table is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Table not found",
        )

    notification = {
        "customer_name": customer["name"],
        "phone_number": customer["phone_number"],
        "table_number": table["table_number"],
        "message": (
            f"Hi {customer['name']}, your table for {customer['party_size']} "
            f"is ready at Table {table['table_number']}."
        ),
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }
    store.notifications.append(notification)
    return SimulatedNotification.model_validate(notification)
