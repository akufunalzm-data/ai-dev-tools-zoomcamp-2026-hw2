/// <reference types="vite/client" />

import type {
  AssignmentRecommendation,
  Customer,
  RestaurantTable,
  SimulatedNotification,
} from "../types/waitlist";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

interface ApiCustomer {
  id: string;
  name: string;
  party_size: number;
  phone_number: string;
  status: Customer["status"];
  created_at: string;
}

interface ApiTable {
  id: string;
  table_number: string;
  capacity: number;
  available: boolean;
}

interface ApiAssignmentRecommendation {
  customer: ApiCustomer;
  table: ApiTable;
  rationale: string;
}

interface ApiNotification {
  customer_name: string;
  phone_number: string;
  table_number: string;
  message: string;
  timestamp: string;
}

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(`${API_BASE_URL}/api/customers`);

  if (!response.ok) {
    throw new Error(`Unable to load customers (${response.status}).`);
  }

  const customers = (await response.json()) as ApiCustomer[];

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    partySize: customer.party_size,
    phoneNumber: customer.phone_number,
    status: customer.status,
    createdAt: customer.created_at,
  }));
}

export async function getTables(): Promise<RestaurantTable[]> {
  const response = await fetch(`${API_BASE_URL}/api/tables`);

  if (!response.ok) {
    throw new Error(`Unable to load tables (${response.status}).`);
  }

  const tables = (await response.json()) as ApiTable[];

  return tables.map((table) => ({
    id: table.id,
    tableNumber: table.table_number,
    capacity: table.capacity,
    available: table.available,
  }));
}

export async function getAssignmentRecommendation(): Promise<AssignmentRecommendation | null> {
  const response = await fetch(`${API_BASE_URL}/api/assignments/recommendation`);

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Unable to load assignment recommendation (${response.status}).`,
    );
  }

  const recommendation =
    (await response.json()) as ApiAssignmentRecommendation;

  return {
    customer: {
      id: recommendation.customer.id,
      name: recommendation.customer.name,
      partySize: recommendation.customer.party_size,
      phoneNumber: recommendation.customer.phone_number,
      status: recommendation.customer.status,
      createdAt: recommendation.customer.created_at,
    },
    table: {
      id: recommendation.table.id,
      tableNumber: recommendation.table.table_number,
      capacity: recommendation.table.capacity,
      available: recommendation.table.available,
    },
    rationale: recommendation.rationale,
  };
}

export async function getNotifications(): Promise<SimulatedNotification[]> {
  const response = await fetch(`${API_BASE_URL}/api/notifications`);

  if (!response.ok) {
    throw new Error(`Unable to load notifications (${response.status}).`);
  }

  const notifications = (await response.json()) as ApiNotification[];

  return notifications.map((notification) => ({
    customerName: notification.customer_name,
    phoneNumber: notification.phone_number,
    tableNumber: notification.table_number,
    message: notification.message,
    timestamp: notification.timestamp,
  }));
}
