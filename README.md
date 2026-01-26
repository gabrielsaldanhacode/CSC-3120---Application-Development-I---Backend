# "What the Campus Resource Reservation API is responsible for:"

# This API is the digital brain for booking things on campus. It works like a traffic controller for study rooms and equipment. Instead of everyone showing up and hoping a room is available, this system keeps everything organized in real-time. It aims to eliminate the issue of double-booking, so when you walk across campus for a lab or a projector, it will be there waiting for you.

# "What types of resources the system manages? "

# Well, it is capable of managing resources like equipment (projectors, lab tools, laptops...), lab spaces and study rooms in the library

# "What actions users will be able to perform through the API? "

# After the implantation of the API, student will be able to browse all the resources in the library, filter them if they are avaiable or not at that moment, and lastly, add or cancel reservations for certains spots of it. 

# "What the system will not handle? "

# Unfortunatly, the API won't be able to do things like: processing payments, online interaction between users and staff nor interactions with any hardware from the library (turn on the printer, for example). 

# I chose Node.js as the runtime environment because it is fast and can handle many user requests at the same time, which works well for a reservation system. Express.js helps manage the routing, so it is easier to organize how the API responds when someone books a room or checks equipment status.
# When talking about data, MySQL was the rgiht option. Since keeping the data integrity was a must and the project involves specific relation (a student belonging to a reservation, which is linked to a room), not having data overlapping was innegotiable.
# GitHub is my main ally when tracking the progress and not loosing track of my actions. Despite that, it also hosts the code.

# Having consistent tools matter, not only in the sense of standardizing procedures, helping with troobleshooting, but also the positive part of the ability of trusting them as the project grows. 

# How to Run Locally
# Download the code: Clone this repository to your computer.
# Install the tools: Run npm install in your terminal to grab the Express framework.
# Launch the server: Type node server.js to start the backend.
# Verify it's working: Visit http://localhost:3000/status in your browser. You should see a message confirming the server is active.

# "Module 1 foundation only"