import type {
  AssignmentRecommendation,
  Customer,
  RestaurantTable,
  SimulatedNotification,
} from "../types/waitlist";

export const mockCustomers: Customer[] = [
  {
    id: "customer-1",
    name: "Alex Morgan",
    partySize: 4,
    phoneNumber: "555-0101",
    status: "Waiting",
    createdAt: "2026-09-12T18:30:00Z",
  },
  {
    id: "customer-2",
    name: "Jordan Lee",
    partySize: 2,
    phoneNumber: "555-0102",
    status: "Notified",
    createdAt: "2026-09-12T18:15:00Z",
  },
  {
    id: "customer-3",
    name: "Taylor Smith",
    partySize: 6,
    phoneNumber: "555-0103",
    status: "Seated",
    createdAt: "2026-09-12T17:55:00Z",
  },
  {
    id: "customer-4",
    name: "Casey Patel",
    partySize: 3,
    phoneNumber: "555-0104",
    status: "Completed",
    createdAt: "2026-09-12T17:20:00Z",
  },
  {
    id: "customer-5",
    name: "Riley Johnson",
    partySize: 8,
    phoneNumber: "555-0105",
    status: "Waiting",
    createdAt: "2026-09-12T18:42:00Z",
  },
];

export const mockTables: RestaurantTable[] = [
  {
    id: "table-1",
    tableNumber: "1",
    capacity: 2,
    available: true,
  },
  {
    id: "table-2",
    tableNumber: "2",
    capacity: 4,
    available: true,
  },
  {
    id: "table-3",
    tableNumber: "3",
    capacity: 6,
    available: false,
  },
  {
    id: "table-4",
    tableNumber: "4",
    capacity: 8,
    available: true,
  },
  {
    id: "table-5",
    tableNumber: "5",
    capacity: 10,
    available: false,
  },
];

export const mockAssignmentRecommendation: AssignmentRecommendation = {
  customer: mockCustomers[0],
  table: mockTables[1],
  rationale: "Table 2 is the smallest available table that accommodates the party of 4.",
};

export const mockNotifications: SimulatedNotification[] = [
  {
    customerName: "Jordan Lee",
    phoneNumber: "555-0102",
    tableNumber: "1",
    message: "Hi Jordan, your table for 2 is ready at Table 1.",
    timestamp: "2026-09-12T18:25:00Z",
  },
];
