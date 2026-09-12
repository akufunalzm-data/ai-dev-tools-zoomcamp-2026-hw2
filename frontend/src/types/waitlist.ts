export type CustomerStatus =
  | "Waiting"
  | "Notified"
  | "Seated"
  | "Completed";

export interface Customer {
  id: string;
  name: string;
  partySize: number;
  phoneNumber: string;
  status: CustomerStatus;
  /** ISO 8601 datetime string. */
  createdAt: string;
}

export interface RestaurantTable {
  id: string;
  tableNumber: string;
  capacity: number;
  available: boolean;
}

export interface AssignmentRecommendation {
  customer: Customer;
  table: RestaurantTable;
  rationale: string;
}

export interface SimulatedNotification {
  customerName: string;
  phoneNumber: string;
  tableNumber: string;
  message: string;
  /** ISO 8601 datetime string. */
  timestamp: string;
}
