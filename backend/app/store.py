from dataclasses import dataclass


@dataclass
class InMemoryStore:
    customers: list[dict[str, object]]
    tables: list[dict[str, object]]
    notifications: list[dict[str, object]]


store = InMemoryStore(
    customers=[
        {
            "id": "customer-1",
            "name": "Alex Morgan",
            "party_size": 4,
            "phone_number": "555-0101",
            "status": "Waiting",
            "created_at": "2026-09-12T18:30:00Z",
        },
        {
            "id": "customer-2",
            "name": "Jordan Lee",
            "party_size": 2,
            "phone_number": "555-0102",
            "status": "Notified",
            "created_at": "2026-09-12T18:15:00Z",
        },
        {
            "id": "customer-3",
            "name": "Taylor Smith",
            "party_size": 6,
            "phone_number": "555-0103",
            "status": "Seated",
            "created_at": "2026-09-12T17:55:00Z",
        },
        {
            "id": "customer-4",
            "name": "Casey Patel",
            "party_size": 3,
            "phone_number": "555-0104",
            "status": "Completed",
            "created_at": "2026-09-12T17:20:00Z",
        },
        {
            "id": "customer-5",
            "name": "Riley Johnson",
            "party_size": 8,
            "phone_number": "555-0105",
            "status": "Waiting",
            "created_at": "2026-09-12T18:42:00Z",
        },
    ],
    tables=[
        {
            "id": "table-1",
            "table_number": "1",
            "capacity": 2,
            "available": True,
        },
        {
            "id": "table-2",
            "table_number": "2",
            "capacity": 4,
            "available": True,
        },
        {
            "id": "table-3",
            "table_number": "3",
            "capacity": 6,
            "available": False,
        },
        {
            "id": "table-4",
            "table_number": "4",
            "capacity": 8,
            "available": True,
        },
        {
            "id": "table-5",
            "table_number": "5",
            "capacity": 10,
            "available": False,
        },
    ],
    notifications=[
        {
            "customer_name": "Jordan Lee",
            "phone_number": "555-0102",
            "table_number": "1",
            "message": "Hi Jordan, your table for 2 is ready at Table 1.",
            "timestamp": "2026-09-12T18:25:00Z",
        },
    ],
)
