# Campus Resource Reservation API

## What the Campus Resource Reservation API is responsible for
This API is the digital brain for booking things on campus. It works like a traffic controller for study rooms and equipment. Instead of everyone showing up and hoping a room is available, this system keeps everything organized in real-time. It aims to eliminate the issue of double-booking, so when you walk across campus for a lab or a projector, it will be there waiting for you.

## What types of resources the system manages? 
It is capable of managing resources like equipment (projectors, lab tools, laptops...), lab spaces, and study rooms in the library.

## What actions users will be able to perform through the API? 
After the implantation of the API, students will be able to browse all the resources in the library, filter them if they are available or not at that moment, and lastly, add or cancel reservations for certain spots of it. 

## What the system will not handle? 
Unfortunately, the API won't be able to do things like: processing payments, online interaction between users and staff, nor interactions with any hardware from the library (turn on the printer, for example). 

## Technology Stack
* **Node.js & Express.js:** I chose Node.js as the runtime environment because it is fast and can handle many user requests at the same time, which works well for a reservation system. Express.js helps manage the routing, so it is easier to organize how the API responds when someone books a room or checks equipment status.
* **MySQL:** When talking about data, MySQL was the right option. Since keeping the data integrity was a must and the project involves specific relations (a student belonging to a reservation, which is linked to a room), not having data overlapping was non-negotiable.
* **GitHub:** GitHub is my main ally when tracking the progress and not losing track of my actions. Despite that, it also hosts the code.

Having consistent tools matters, not only in the sense of standardizing procedures and helping with troubleshooting, but also the positive part of the ability of trusting them as the project grows. 

## How to Run Locally
1. **Download the code:** Clone this repository to your computer.
2. **Install the tools:** Run `npm install` in your terminal to grab the Express framework.
3. **Launch the server:** Type `npm run dev` or `node src/server.js` to start the backend.
4. **Verify it's working:** Visit `http://localhost:3000/api/resources` in your browser or Postman. 

---

## Project Milestones & History

### Module 1 Foundation
Initial project concept and technology selection.

### Milestone 2: Database Schema
Designed and implemented the relational MySQL database schema for the Campus Resource Reservation API. Created the core tables for users, resources, and reservations, ensuring they were properly linked using foreign key relationships. Additionally, I improved the database's realism by adding custom fields like room capacity and enforced data integrity with time-based constraints.

### Milestone 3: Server Connection
Implemented basic GET and POST API routes and connected the Express server to the MySQL database.

### Refinement and Optimization (Milestone 7)
During the final optimization phase of the API, the following improvements were implemented to enhance maintainability, performance, and overall code quality:

* **Code Refactoring & Middleware Flow:** Centralized error handling by routing all `catch` block exceptions through Express's `next(error)` pipeline to the custom `errorHandler.js` middleware. This removed redundant `res.status(500)` boilerplate from the controllers. Furthermore, I verified that authentication and validation middleware execute strictly before business logic.
* **Database & Performance Improvements:** Updated SQL queries to safely handle empty result sets (`length === 0`) to prevent unexpected crashes. Additionally, I replaced broad `SELECT *` queries in specific routes with targeted field selections (e.g., `SELECT user_id, full_name, email FROM users`), reducing database load and preventing sensitive data like password hashes from being processed or leaked in memory.