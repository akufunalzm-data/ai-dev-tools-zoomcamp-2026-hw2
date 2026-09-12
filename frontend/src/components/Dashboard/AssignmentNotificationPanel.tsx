import type {
  AssignmentRecommendation as AssignmentRecommendationData,
  RestaurantTable,
  SimulatedNotification,
} from "../../types/waitlist";
import { AssignmentRecommendation } from "./AssignmentRecommendation";
import { SimulatedSmsMessage } from "./SimulatedSmsMessage";
import { TableAvailability } from "./TableAvailability";

interface AssignmentNotificationPanelProps {
  tables: RestaurantTable[];
  recommendation: AssignmentRecommendationData | null;
  notifications: SimulatedNotification[];
}

export function AssignmentNotificationPanel({
  tables,
  recommendation,
  notifications,
}: AssignmentNotificationPanelProps) {
  return (
    <section aria-labelledby="assignment-heading">
      <h2 id="assignment-heading">Assignment &amp; Notification</h2>
      <TableAvailability tables={tables} />
      <AssignmentRecommendation recommendation={recommendation} />
      <SimulatedSmsMessage notification={notifications[0] ?? null} />
    </section>
  );
}
