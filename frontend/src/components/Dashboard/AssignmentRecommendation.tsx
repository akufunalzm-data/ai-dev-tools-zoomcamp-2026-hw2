import type { AssignmentRecommendation as AssignmentRecommendationData } from "../../types/waitlist";

interface AssignmentRecommendationProps {
  recommendation: AssignmentRecommendationData | null;
}

export function AssignmentRecommendation({
  recommendation,
}: AssignmentRecommendationProps) {
  if (!recommendation) {
    return <p>No table assignment recommendation is available.</p>;
  }

  return (
    <div>
      <h3>Recommended assignment</h3>
      <p>
        {recommendation.customer.name} — Table {recommendation.table.tableNumber}
      </p>
      <p>{recommendation.rationale}</p>
    </div>
  );
}
