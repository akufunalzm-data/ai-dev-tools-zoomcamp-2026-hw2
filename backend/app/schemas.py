from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class CustomerStatus(str, Enum):
    WAITING = "Waiting"
    NOTIFIED = "Notified"
    SEATED = "Seated"
    COMPLETED = "Completed"


class Customer(BaseModel):
    id: str
    name: str
    party_size: int = Field(gt=0)
    phone_number: str
    status: CustomerStatus
    created_at: datetime


class CustomerCreate(BaseModel):
    name: str
    party_size: int = Field(gt=0)
    phone_number: str


class CustomerStatusUpdate(BaseModel):
    status: CustomerStatus


class RestaurantTable(BaseModel):
    id: str
    table_number: str
    capacity: int = Field(gt=0)
    available: bool


class AssignmentRecommendation(BaseModel):
    customer: Customer
    table: RestaurantTable
    rationale: str


class AssignmentCreate(BaseModel):
    customer_id: str
    table_id: str


class AssignmentResponse(BaseModel):
    customer: Customer
    table: RestaurantTable


class SimulatedNotification(BaseModel):
    customer_name: str
    phone_number: str
    table_number: str
    message: str
    timestamp: datetime


class NotificationCreate(BaseModel):
    customer_id: str
    table_id: str
