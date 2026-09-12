import type { CustomerStatus } from "../../types/waitlist";

interface StatusBadgeProps {
  status: CustomerStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span>{status}</span>;
}
