# Room_Management_Assignment
Backend routes developed for a room management application using Node.JS and PostgreSQL

## To run the project:
i) Clone the project into your system
ii) Create a Postgre Database using commands in ini.sql file
iii) Run command 'npm install'
iv) Create a .env file in the root of project
v) Add values for PORT, USER, PASSWORD, HOST, DBPORT, SECRET_KEY, DB_NAME
vi) Run command 'npm run start'

## Routes:
a) /register : To let users register themselves
b) /login : To let users login to the system
c) /booking/id (POST) : To create a reservation
d) /booking/id (DELETE) : To delete a reservation

## Middlewares:
a) isEligible : To check if the user is an admin
b) isLogin : To check if user is logged in
