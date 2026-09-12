import {
  mockAssignmentRecommendation,
  mockCustomers,
  mockNotifications,
  mockTables,
} from "../data/mockData";
import type {
  AssignmentRecommendation,
  Customer,
  RestaurantTable,
  SimulatedNotification,
} from "../types/waitlist";

export function getCustomers(): Promise<Customer[]> {
  return Promise.resolve(mockCustomers.map((customer) => ({ ...customer })));
}

export function getTables(): Promise<RestaurantTable[]> {
  return Promise.resolve(mockTables.map((table) => ({ ...table })));
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
