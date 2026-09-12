import type { RestaurantTable } from "../../types/waitlist";

interface TableAvailabilityProps {
  tables: RestaurantTable[];
}

export function TableAvailability({ tables }: TableAvailabilityProps) {
  if (tables.length === 0) {
    return <p>No tables are available.</p>;
  }

  return (
    <div>
      <h3>Tables</h3>
      <ul>
        {tables.map((table) => (
          <li key={table.id}>
            Table {table.tableNumber} ({table.capacity} seats):{" "}
            {table.available ? "Available" : "Unavailable"}
          </li>
        ))}
      </ul>
    </div>
  );
}
