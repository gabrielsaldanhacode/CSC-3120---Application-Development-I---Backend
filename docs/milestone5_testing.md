# Milestone 5: Authentication & Authorization Testing

## 1. Registration & Hashing
- Action: POST /auth/register
- Result: User registered successfully. Verified in MySQL that the password is encrypted using Bcrypt.

## 2. JWT Login
- Action: POST /auth/login
- Result: Received a valid JWT token. Verified the payload contains the user's ID and role.

## 3. Authenticated Access (Reservations)
- Action: POST /api/reservations (with Bearer Token)
- Result: **201 Created**. Access granted because the user provided a valid token.

## 4. Role-Based Authorization (Resources)
- Action: POST /api/resources (with Bearer Token)
- Result: **403 Forbidden**. Correctly blocked access because the user has a 'user' role and not 'admin'.
