# TableFlow Homework 2 Frontend Prototype Plan

## MVP screens

### 1. Dashboard

The primary screen should contain:

- Waiting-customer queue
- Queue position
- Customer name
- Party size
- Phone number
- Arrival time
- Customer status
- Available table summary
- Links or controls for assignment actions

Supported statuses:

- `Waiting`
- `Notified`
- `Seated`
- `Completed`

### 2. Add Customer Form

Fields:

- Customer name
- Party size
- Phone number

Behavior:

- Validate required fields and valid party size
- Submit through `waitlistService.ts`
- Create the customer with status `Waiting`
- Refresh the dashboard data
- Clear the form after success
- Display validation or submission errors

### 3. Assignment & Notification Panel

The panel should support:

- Displaying available tables
- Showing the recommended waiting customer
- Showing the recommended table
- Confirming the assignment
- Marking the customer as `Notified`
- Displaying the generated simulated SMS message
- Advancing the customer to `Seated`
- Marking the customer as `Completed`

No separate customer-details page, reservations screen, authentication screen, or SMS configuration screen should be added.

## Recommended React structure

```text
src/
├── App.tsx
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── WaitlistTable.tsx
│   │   ├── WaitlistRow.tsx
│   │   └── StatusBadge.tsx
│   ├── Customers/
│   │   └── AddCustomerForm.tsx
│   └── Assignment/
│       ├── AssignmentNotificationPanel.tsx
│       ├── TableAvailability.tsx
│       ├── AssignmentRecommendation.tsx
│       └── SimulatedSmsMessage.tsx
├── services/
│   └── waitlistService.ts
├── types/
│   └── waitlist.ts
├── data/
│   └── mockData.ts
└── styles/
    └── app.css
```

`App.tsx` should compose the three MVP areas:

```text
App
└── Dashboard
    ├── AddCustomerForm
    ├── WaitlistTable
    └── AssignmentNotificationPanel
```

## Mock service layer

All mock backend interactions should be centralized in:

```text
src/services/waitlistService.ts
```

Components should not directly import or mutate mock data.

Recommended service functions:

```ts
getCustomers(): Promise<Customer[]>
addCustomer(input: AddCustomerInput): Promise<Customer>
getTables(): Promise<Table[]>
getAssignmentRecommendation(): Promise<AssignmentRecommendation | null>
confirmAssignment(customerId: string, tableId: string): Promise<AssignmentResult>
updateCustomerStatus(
  customerId: string,
  status: CustomerStatus
): Promise<Customer>
generateNotification(
  customerId: string,
  tableId: string
): Promise<SimulatedNotification>
```

The service should:

- Own the mock customer and table state
- Simulate asynchronous API calls
- Apply queue-ordering and table-matching logic
- Return copies of data rather than exposing mutable state
- Use the same function boundaries that a future FastAPI client can implement

## Mock data requirements

### Customers

Provide mock customers with:

- Unique IDs
- Names
- Party sizes
- Phone numbers
- Creation timestamps
- All supported status values
- Multiple queue positions

Include cases for:

- A waiting customer with a suitable table
- A waiting customer with no currently suitable table
- Exact and oversized table matches
- Customers already notified, seated, and completed

### Tables

Provide tables with:

- Unique IDs
- Table numbers
- Different capacities
- Available and unavailable states

Recommendation logic should:

1. Consider only available tables.
2. Select a table that accommodates the party.
3. Prefer the smallest suitable table.
4. Select the earliest waiting customer when choosing a party.
5. Return no recommendation when no suitable table exists.

### Notifications

Mock notification responses should include:

- Customer name
- Phone number
- Table number
- Message text
- Notification timestamp

Example message:

```text
Hi Alex, your table for 4 is ready at Table 6.
```

## State and interaction flow

`App.tsx` or a small custom hook should coordinate screen state by calling the service layer.

### Initial load

1. Load customers through `getCustomers()`.
2. Load tables through `getTables()`.
3. Load the recommendation through `getAssignmentRecommendation()`.
4. Render the Dashboard and Assignment & Notification Panel.

### Add customer

1. User submits `AddCustomerForm`.
2. Form calls `addCustomer()`.
3. App reloads customers and the recommendation.
4. New customer appears at the end of the waiting queue.

### Confirm assignment

1. User reviews the recommendation.
2. User confirms the assignment.
3. App calls `confirmAssignment()`.
4. App calls or receives the simulated notification.
5. Customer status becomes `Notified`.
6. The assigned table becomes unavailable.
7. Dashboard and panel refresh.

### Progress customer status

1. User selects `Seated` or `Completed`.
2. App calls `updateCustomerStatus()`.
3. Dashboard refreshes the customer row.
4. Recommendation state is recalculated when relevant.

## Recommended implementation order

1. Define TypeScript types for customers, tables, statuses, assignments, and notifications.
2. Create mock data covering all required MVP states.
3. Implement `waitlistService.ts` with asynchronous mock methods.
4. Build the Dashboard with a static waitlist view.
5. Connect the Dashboard to `getCustomers()`.
6. Build and validate the Add Customer Form.
7. Connect customer creation through `addCustomer()`.
8. Build the Assignment & Notification Panel.
9. Implement recommendation logic in the service layer.
10. Implement assignment confirmation and table availability updates.
11. Implement simulated notification generation and display.
12. Add `Seated` and `Completed` status transitions.
13. Add loading, empty, validation, and error states.
14. Test the complete MVP flow: add customer → recommend table → confirm assignment → notify → seat → complete.
15. Keep the service API stable so it can later be replaced with FastAPI requests without restructuring the UI.
