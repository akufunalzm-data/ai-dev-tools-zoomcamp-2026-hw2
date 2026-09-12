import type { Customer } from "../../types/waitlist";
import { WaitlistRow } from "./WaitlistRow";

interface WaitlistTableProps {
  customers: Customer[];
}

export function WaitlistTable({ customers }: WaitlistTableProps) {
  if (customers.length === 0) {
    return <p>No customers are currently on the waitlist.</p>;
  }

  return (
    <table>
      <caption>Current waitlist</caption>
      <thead>
        <tr>
          <th scope="col">Queue position</th>
          <th scope="col">Customer</th>
          <th scope="col">Party size</th>
          <th scope="col">Phone</th>
          <th scope="col">Arrival time</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <WaitlistRow key={customer.id} customer={customer} position={index + 1} />
        ))}
      </tbody>
    </table>
  );
}
