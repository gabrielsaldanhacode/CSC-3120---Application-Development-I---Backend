# Milestone 2: Database Schema Design Explanation

## Entities I Designed
List the core entities for the system and why they matter.
- **Users**: People who can log in and make reservations. Needed for authentication and tracking who booked what.
- **Resources**: The things being reserved (rooms, equipment). Central to the system – without these, nothing to book.
- **Reservations**: Bookings linking a user to a resource for a time slot. The core transaction of the entire app.

## Relationships
Explain how your tables relate.
- How does a reservation connect to a user?  
  Via foreign key `user_id` → references `users(user_id)` with ON DELETE CASCADE (if user deleted, their reservations go too).
- How does a reservation connect to a resource?  
  Via foreign key `resource_id` → references `resources(resource_id)` with ON DELETE CASCADE.

## Assumptions
List any assumptions you made about how the reservation system works.
- Any user can reserve any active resource (no role-based restrictions yet).
- Overlapping bookings for the same resource are not prevented at the database level – this will be enforced in the API layer later.
- Reservations can be up to any length (no max duration rule yet).
- Only 'student' and 'admin' roles exist now, but the field allows expansion.

## One Design Decision I Made
Describe one decision you made and why.  
I added a `purpose` field to the reservations table because real-world systems need to know why someone is booking a resource (just like: "group study" vs "presentation practice"). This improves reporting and admin oversight later.