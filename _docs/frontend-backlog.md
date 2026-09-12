| Task | Objective | Expected outcome |
|---|---|---|
| 1 | Define TypeScript models for customers, tables, statuses, assignments, and notifications. | Shared types exist for all frontend MVP data structures. |
| 2 | Create representative mock customers and tables. | Mock data covers waiting, notified, seated, completed, available, unavailable, and unmatched scenarios. |
| 3 | Implement `waitlistService.ts` with customer and table retrieval methods. | Components can asynchronously load customers and tables through the service layer. |
| 4 | Build the Dashboard layout and waitlist table. | The Dashboard displays queue position, customer details, status, and arrival time. |
| 5 | Connect the Dashboard to `waitlistService.ts`. | Customers load from the mock service and loading, empty, and error states are visible. |
| 6 | Build and validate the Add Customer Form. | Users can enter name, party size, and phone number with validation feedback. |
| 7 | Implement customer creation through the service layer. | A valid submission adds a `Waiting` customer and updates the Dashboard queue. |
| 8 | Implement table recommendation logic in `waitlistService.ts`. | The service selects the earliest suitable waiting party and smallest available table, or returns no recommendation. |
| 9 | Build the Assignment & Notification Panel. | The panel displays available tables, the recommendation, and an assignment confirmation action. |
| 10 | Implement assignment confirmation and simulated notification generation. | Confirming an assignment marks the customer `Notified`, makes the table unavailable, and displays a simulated SMS message. |
| 11 | Implement customer status transitions. | Staff can move customers from `Notified` to `Seated` and from `Seated` to `Completed`. |
| 12 | Verify the complete MVP workflow and add focused frontend tests. | The flow from adding a customer through assignment, notification, seating, and completion works and is independently testable. |
