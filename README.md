### Expense Tracker API
### Overview
The Expense Tracker API is a simple RESTful service built using Node.js, Express, and SQLite. It allows users to register, log in, and manage personal transactions. The API supports creating, viewing, and paginating through transactions. Authentication is implemented using JWT (JSON Web Token).

### Features
User registration and login with hashed passwords (using bcrypt).
JWT-based authentication to secure endpoints.
CRUD operations for transactions (add, view with pagination).
SQLite database for storing user and transaction data.
Prerequisites
Node.js (v14 or higher)
SQLite3
A package manager like npm or yarn
Getting Started
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add the following variables:

makefile
Copy code
ACCESS_TOKEN_SECRET=your_secret_key_here
DB_PATH=./database/expense-tracker.db
ACCESS_TOKEN_SECRET: This is the secret key used to sign the JWT tokens. Replace your_secret_key_here with a strong secret.
DB_PATH: Path to your SQLite database file.
4. Initialize the Database
Make sure the SQLite database is created, and the necessary tables are set up. If not done already, you can use a script to initialize the database schema.

5. Run the Application
bash
Copy code
npm start
Your API will be running at http://localhost:3000.

API Endpoints
Authentication
Register a User

Endpoint: POST /register
Request Body:
json
Copy code
{
  "username": "exampleUser",
  "password": "examplePassword"
}
Response:
json
Copy code
{
  "message": "User registered successfully"
}
Login a User

Endpoint: POST /login
Request Body:
json
Copy code
{
  "username": "exampleUser",
  "password": "examplePassword"
}
Response:
json
Copy code
{
  "token": "jwt_token_here"
}
Transactions
Get All Transactions with Pagination

Endpoint: GET /transactions
Headers:
json
Copy code
{
  "Authorization": "Bearer <your_token>"
}
Query Parameters:
page: The page number (default: 1)
limit: The number of transactions per page (default: 10)
Response:
json
Copy code
[
  {
    "id": 1,
    "type": "income",
    "category": "salary",
    "amount": 1000,
    "date": "2024-01-01",
    "description": "Monthly salary"
  },
  ...
]
Add a Transaction

Endpoint: POST /transactions
Headers:
json
Copy code
{
  "Authorization": "Bearer <your_token>"
}
Request Body:
json
Copy code
{
  "type": "income",
  "category": "salary",
  "amount": 1000,
  "date": "2024-01-01",
  "description": "Monthly salary"
}
Response:
json
Copy code
{
  "message": "Transaction added successfully"
}
Pagination
The GET /transactions endpoint supports pagination through the following query parameters:

page: The page number you want to fetch (default is 1).
limit: The number of transactions to return per page (default is 10).
For example:

bash
Copy code
GET /transactions?page=2&limit=5
Technologies Used
Backend: Node.js, Express.js
Database: SQLite3
Authentication: JWT, bcrypt
Environment Variables: dotenv