from collections.abc import Generator
from datetime import datetime

from sqlalchemy import create_engine, select
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

DATABASE_URL = "sqlite:///./tableflow.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)


class Base(DeclarativeBase):
    pass


SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    from app.models import (
        Customer as CustomerModel,
        RestaurantTable as RestaurantTableModel,
        SimulatedNotification as SimulatedNotificationModel,
    )
    from app.store import store

    Base.metadata.create_all(bind=engine)

    with SessionLocal() as db:
        _seed_database(
            db,
            CustomerModel,
            RestaurantTableModel,
            SimulatedNotificationModel,
            store,
        )


def _seed_database(
    db: Session,
    customer_model: type,
    table_model: type,
    notification_model: type,
    store: object,
) -> None:
    if db.scalar(select(customer_model.id).limit(1)) is None:
        db.add_all(
            [
                customer_model(
                    id=customer["id"],
                    name=customer["name"],
                    party_size=customer["party_size"],
                    phone_number=customer["phone_number"],
                    status=customer["status"],
                    created_at=_parse_datetime(customer["created_at"]),
                )
                for customer in store.customers
            ]
        )

    if db.scalar(select(table_model.id).limit(1)) is None:
        db.add_all(
            [
                table_model(
                    id=table["id"],
                    table_number=table["table_number"],
                    capacity=table["capacity"],
                    available=table["available"],
                )
                for table in store.tables
            ]
        )

    if db.scalar(select(notification_model.id).limit(1)) is None:
        db.add_all(
            [
                notification_model(
                    customer_name=notification["customer_name"],
                    phone_number=notification["phone_number"],
                    table_number=notification["table_number"],
                    message=notification["message"],
                    timestamp=_parse_datetime(notification["timestamp"]),
                )
                for notification in store.notifications
            ]
        )

    db.commit()


def _parse_datetime(value: object) -> datetime:
    return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
