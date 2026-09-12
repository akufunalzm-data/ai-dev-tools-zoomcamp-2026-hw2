import type { SimulatedNotification } from "../../types/waitlist";

interface SimulatedSmsMessageProps {
  notification: SimulatedNotification | null;
}

export function SimulatedSmsMessage({
  notification,
}: SimulatedSmsMessageProps) {
  if (!notification) {
    return <p>No simulated notifications are available.</p>;
  }

  return (
    <div>
      <h3>Simulated SMS</h3>
      <p>To: {notification.phoneNumber}</p>
      <p>{notification.message}</p>
      <time dateTime={notification.timestamp}>
        {new Date(notification.timestamp).toLocaleString()}
      </time>
    </div>
  );
}
