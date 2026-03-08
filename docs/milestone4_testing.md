# Milestone 4 Testing Notes

### 1. Request that fails validation
* **What I did:** Sent a POST request to `/users` with only a `full_name`, but completely forgot to include the `email`.
* **What happened:** The API blocked the request and returned a 400 Bad Request status with the message: `{"error": "Missing required field: email"}`.

### 2. Handled server error
* **What I did:** I temporarily forced a typo in my SQL query inside the users route to break the code.
* **What happened:** Instead of crashing the server, my central error handler caught it and safely returned a 500 status with `{"error": "An unexpected server error occurred"}`. 

### 3. Successful request after validation
* **What I did:** Sent a POST request to `/users` with both `full_name` and `email` included correctly.
* **What happened:** The validation middleware let the request pass through and the user was successfully created in the database with a 201 Created status.