import type { Customer } from "../../types/waitlist";
import { StatusBadge } from "./StatusBadge";

interface WaitlistRowProps {
  customer: Customer;
  position: number;
}

export function WaitlistRow({ customer, position }: WaitlistRowProps) {
  return (
    <tr>
      <td>{position}</td>
      <td>{customer.name}</td>
      <td>{customer.partySize}</td>
      <td>{customer.phoneNumber}</td>
      <td>
        <time dateTime={customer.createdAt}>
          {new Date(customer.createdAt).toLocaleTimeString()}
        </time>
      </td>
      <td>
        <StatusBadge status={customer.status} />
      </td>
    </tr>
  );
}
