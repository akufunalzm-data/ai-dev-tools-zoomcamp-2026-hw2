import { useEffect, useState } from "react";
import {
  getAssignmentRecommendation,
  getCustomers,
  getNotifications,
  getTables,
} from "../../services/waitlistService";
import type {
  AssignmentRecommendation as AssignmentRecommendationData,
  Customer,
  RestaurantTable,
  SimulatedNotification,
} from "../../types/waitlist";
import { AssignmentNotificationPanel } from "./AssignmentNotificationPanel";
import { DashboardHeader } from "./DashboardHeader";
import { WaitlistTable } from "./WaitlistTable";

export function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [recommendation, setRecommendation] =
    useState<AssignmentRecommendationData | null>(null);
  const [notifications, setNotifications] = useState<SimulatedNotification[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      setIsLoading(true);
      setError(null);

      try {
        const [customerData, tableData, recommendationData, notificationData] =
          await Promise.all([
            getCustomers(),
            getTables(),
            getAssignmentRecommendation(),
            getNotifications(),
          ]);

        if (!isMounted) {
          return;
        }

        setCustomers(customerData);
        setTables(tableData);
        setRecommendation(recommendationData);
        setNotifications(notificationData);
      } catch {
        if (isMounted) {
          setError("Unable to load dashboard data.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <main aria-busy="true">Loading dashboard...</main>;
  }

  if (error) {
    return (
      <main role="alert">
        <h1>Waitlist Dashboard</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <DashboardHeader customerCount={customers.length} tableCount={tables.length} />
      <section aria-labelledby="waitlist-heading">
        <h2 id="waitlist-heading">Waitlist</h2>
        <WaitlistTable customers={customers} />
      </section>
      <AssignmentNotificationPanel
        tables={tables}
        recommendation={recommendation}
        notifications={notifications}
      />
    </main>
  );
}
