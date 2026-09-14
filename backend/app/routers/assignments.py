from datetime import datetime

from fastapi import APIRouter, HTTPException, Response, status

from app.schemas import (
    AssignmentCreate,
    AssignmentRecommendation,
    AssignmentResponse,
    Customer,
    CustomerStatus,
    RestaurantTable,
)
from app.store import store

router = APIRouter(prefix="/api/assignments", tags=["assignments"])


@router.get("/recommendation", response_model=AssignmentRecommendation)
def get_assignment_recommendation() -> AssignmentRecommendation | Response:
    waiting_customers = [
        customer for customer in store.customers if customer["status"] == "Waiting"
    ]
    if not waiting_customers:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    customer_record = min(
        waiting_customers,
        key=lambda customer: datetime.fromisoformat(
            str(customer["created_at"]).replace("Z", "+00:00")
        ),
    )
    suitable_tables = [
        table
        for table in store.tables
        if table["available"] and table["capacity"] >= customer_record["party_size"]
    ]
    if not suitable_tables:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    table_record = min(suitable_tables, key=lambda table: table["capacity"])
    customer = Customer.model_validate(customer_record)
    table = RestaurantTable.model_validate(table_record)

    return AssignmentRecommendation(
        customer=customer,
        table=table,
        rationale=(
            f"Table {table.table_number} is the smallest available table that "
            f"accommodates the party of {customer.party_size}."
        ),
    )


@router.post("", response_model=AssignmentResponse)
def create_assignment(assignment: AssignmentCreate) -> AssignmentResponse:
    customer_record = next(
        (customer for customer in store.customers if customer["id"] == assignment.customer_id),
        None,
    )
    if customer_record is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )

    table_record = next(
        (table for table in store.tables if table["id"] == assignment.table_id),
        None,
    )
    if table_record is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Table not found",
        )

    if customer_record["status"] != CustomerStatus.WAITING.value:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Customer must be Waiting to be assigned",
        )

    if not table_record["available"]:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Table is not available",
        )

    if table_record["capacity"] < customer_record["party_size"]:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Table capacity is insufficient for the customer party",
        )

    table_record["available"] = False
    customer_record["status"] = CustomerStatus.NOTIFIED.value

    return AssignmentResponse(
        customer=Customer.model_validate(customer_record),
        table=RestaurantTable.model_validate(table_record),
    )
