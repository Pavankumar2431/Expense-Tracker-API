const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser
const transactionRoutes = require('./routes/transactionRoutes'); // Import your routes

const app = express(); // Create an Express application
const PORT = 5050; // Define the port number

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use transaction routes
app.use('/', transactionRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
