# TableFlow

## Overview

TableFlow is a restaurant waitlist management application designed for busy restaurants with multiple tables and staff members.

The application helps staff manage customer waitlists, assign tables efficiently, and notify customers when their table is ready.

## Target Users

- Restaurant hosts
- Front-of-house staff
- Restaurant managers

## MVP Features

### 1. Add Customer to Waitlist

Staff can add a customer using:

- Customer name
- Party size
- Phone number

### 2. View and Manage Waitlist

Staff can:

- View waiting customers
- View queue order
- View customer status

### 3. Table Assignment

When a table becomes available:

- The system recommends the best matching party
- Staff reviews the recommendation
- Staff confirms the assignment

### 4. Simulated SMS Notification

After assignment:

- The application generates a simulated SMS message
- No real SMS integration is required

## Customer Status Workflow

Waiting
→ Notified
→ Seated
→ Completed

## Initial Data Model

### Customer

- id
- name
- party_size
- phone_number
- status
- created_at

### Table

- id
- table_number
- capacity
- available

## Out of Scope

- Real SMS integration
- Authentication
- Role-based permissions
- Reservations
- Multi-branch support

## Success Criteria

A user can:

1. Add a customer to the waitlist
2. View the waitlist
3. Assign a table
4. Send a simulated notification
5. Move customers through the workflow