Milestone 6 - Error Handling and Logging

1\. Request Logging

I implemented the requestLogger.js middleware to track incoming traffic. When I run the server and make requests through Postman, the terminal now shows the method, the path, and the time it happened.



Example of a logged request in my terminal:

\[2026-04-05T15:30:45.123Z] GET /api/resources

\[2026-04-05T15:31:10.456Z] POST /api/reservations



2\. Handled Error Response

I updated the routes to use try/catch blocks. If something goes wrong (like a database connection issue or a bad SQL query), the errorHandler.js middleware catches it so the server doesn't crash.



Example of a handled 500 error:

If I try to query a table that doesn't exist, the API returns this JSON instead of hanging:



JSON

{

&#x20; "error": "Table 'campus\_db.reservations' doesn't exist"

}

3\. Validation Errors

I added checks to make sure the data sent to the API is correct. If a user forgets a field or enters a bad date, the API returns a 400 Bad Request.



Example 1: Missing Fields

If I try to POST a reservation without the resource\_id, I get this:



JSON

{

&#x20; "error": "resource\_id, start\_time, and end\_time are required"

}

Example 2: Logic Validation

If I try to set an end\_time that is earlier than the start\_time:



JSON

{

&#x20; "error": "End time must be after the start time."

}

4\. Final Reliability Check

The API now stays running even after these errors occur. Every request is logged to the console, and the error responses are consistent JSON objects, making the backend much easier to debug.

