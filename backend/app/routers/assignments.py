from datetime import datetime

from fastapi import APIRouter, Response, status

from app.schemas import AssignmentRecommendation, Customer, RestaurantTable
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
