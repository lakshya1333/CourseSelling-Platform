It is a Backend for Course selling platform .
Express.js was used for the server.
MondoDb was used for the Database.
JWT token was used so that we dont store original passwords directly in the database.
I also used .env file to keep the JWT passwords secure before pushing them to any public repository.
I created custom middleware for every endpoint which check the token which was issued to the user during SignIn.
The backend is fully tested using Postman.

I need to work on Frontend for this application.
