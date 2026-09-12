interface DashboardHeaderProps {
  customerCount: number;
  tableCount: number;
}

export function DashboardHeader({
  customerCount,
  tableCount,
}: DashboardHeaderProps) {
  return (
    <header>
      <h1>Waitlist Dashboard</h1>
      <p>{customerCount} customers</p>
      <p>{tableCount} tables</p>
    </header>
  );
}
