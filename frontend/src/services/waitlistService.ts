/// <reference types="vite/client" />

import {
  mockAssignmentRecommendation,
  mockNotifications,
} from "../data/mockData";
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

export function getAssignmentRecommendation(): Promise<AssignmentRecommendation | null> {
  if (!mockAssignmentRecommendation) {
    return Promise.resolve(null);
  }

  return Promise.resolve({
    ...mockAssignmentRecommendation,
    customer: { ...mockAssignmentRecommendation.customer },
    table: { ...mockAssignmentRecommendation.table },
  });
}

export function getNotifications(): Promise<SimulatedNotification[]> {
  return Promise.resolve(
    mockNotifications.map((notification) => ({ ...notification })),
  );
}
