# Expense Tracker API
### Overview
The Expense Tracker API is a simple RESTful service built using Node.js, Express, and SQLite. It allows users to register, log in, and manage personal transactions. The API supports creating, viewing, and paginating through transactions. Authentication is implemented using JWT (JSON Web Token).

### Features

•	User registration and login with hashed passwords (using bcrypt).

•	JWT-based authentication to secure endpoints.

•	CRUD operations for transactions (add, view with pagination).

•	SQLite database for storing user and transaction data.
### Prerequisites
•	Node.js (v14 or higher)

•	SQLite3

•	A package manager like npm or yarn

### Getting Started
### Clone the Repository
	“git clone https://github.com/Pavankumar2431/Expense-Tracker-API.git”

	“cd expense-tracker-api”

	“npm install”

### Configure Environment Variables

Create a .env file in the root directory and add the following variables:

“ACCESS_TOKEN_SECRET=your_secret_key_here”

“PORT=port_number”

ACCESS_TOKEN_SECRET: This is the secret key used to sign the JWT tokens. Replace your_secret_key_here with a strong secret.
Make sure the SQLite database is created, and the necessary tables are set up. If not done already, you can use a script to initialize the database schema.

### Run the Application

	“npm start”

Your API will be running at http://localhost:5050

Test the API using postman or any other platform
## API Documentation
This API provides functionality for managing transactions in an expense tracker. It supports operations such as adding, retrieving, updating, deleting transactions, and fetching a summary of transactions.

#### Base URL
	"http://localhost:<PORT>/api"
### Endpoints
### Add a New Transaction
Endpoint: POST /transactions

* Adds a new transaction to the system.

#### Request Body:
	{
	  "type": "income",  // or 'expense'
	  "category": "salary",
	  "amount": 1000,
	  "date": "2024-10-01",
	  "description": "October salary"
	}
#### Response:

	{
	  "message": "Transaction added successfully"
	}
#### Error Response:

	{
	  "error": "Invalid input"
	}
### Get All Transactions (with Pagination)
Endpoint: GET /transactions

* Retrieves a paginated list of transactions.

* Query Parameters (optional):

* page: The page number (default: 1)

* limit: Number of transactions per page (default: 10)
#### Response:

	{
	  "totalItems": 100,
	  "totalPages": 10,
	  "currentPage": 1,
	  "transactions": [
	    {
	      "id": 1,
	      "type": "income",
	      "category": "salary",
	      "amount": 1000,
	      "date": "2024-10-01",
	      "description": "October salary"
	    },
	    ...
	  ]
	}
### Get a Single Transaction by ID
Endpoint: GET /transactions/:id

* Retrieves a specific transaction by its ID.

#### Response:

	{
	  "id": 1,
	  "type": "income",
	  "category": "salary",
	  "amount": 1000,
	  "date": "2024-10-01",
	  "description": "October salary"
	}
#### Error Response:

	{
	  "error": "Transaction not found"
	}
### Update a Transaction by ID
Endpoint: PUT /transactions/:id

* Updates an existing transaction by its ID.

#### Request Body:

	{
	  "type": "expense",  // or 'income'
	  "category": "groceries",
	  "amount": 200,
	  "date": "2024-10-05",
	  "description": "Grocery shopping"
	}
#### Response:

	{
	  "message": "Transaction updated successfully"
	}
#### Error Response:

	{
	  "error": "Transaction not found"
	}
### Delete a Transaction by ID
Endpoint: DELETE /transactions/:id

* Deletes a transaction by its ID.

#### Response:

	{
	  "message": "Transaction deleted successfully"
	}
#### Error Response:

	{
	  "error": "Transaction not found"
	}
### Get Transaction Summary
Endpoint: GET /summary

* Retrieves a summary of transactions, including total income, total expenses, and balance. Supports optional filtering by date range and category.

Query Parameters (optional):

* startDate: Filter transactions starting from this date (YYYY-MM-DD format)

* endDate: Filter transactions up to this date (YYYY-MM-DD format)

* category: Filter by a specific category (e.g., "salary")
#### Response:

	{
	  "total_income": 5000,
	  "total_expenses": 2500,
	  "balance": 2500
	}
#### Error Response:
	{
	  "error": "Failed to retrieve summary"
	}
### Error Handling
400 Bad Request: Returned when invalid data is provided (e.g., missing required fields, invalid format).

	{
	  "error": "Invalid input"
	}
404 Not Found: Returned when a resource (e.g., transaction) is not found.

	{
	  "error": "Transaction not found"
	}
500 Internal Server Error: Returned when the server encounters an error processing the request.

	{
	  "error": "Failed to retrieve transactions"
	}
 
## API Endpoints

### Authentication

•	Register a User

#### Endpoint: POST /register
![register](https://github.com/user-attachments/assets/a468c366-fb9b-43ac-9111-c3f490d990b4)
Register a new user by providing a username and password.

•	Login a User
#### Endpoint: POST /login
![login](https://github.com/user-attachments/assets/47f1a46b-f482-44cf-ad59-80a9378b5487)

After logging in to the server, you will receive a token in the response. Place this token in the headers under the key Authorization with the value Bearer <token>.

### Transactions

•	Get All Transactions with Pagination
####	Endpoint: GET /transactions 

![getall](https://github.com/user-attachments/assets/9ae9172e-01dc-4a05-a6dc-a7f56b6b7ff5)

#### Query Parameters:

page: The page number (default: 1)
	
limit: The number of transactions per page (default: 10)

### Pagination
For example

“GET http://localhost:5050/transactions?page=2&limit=5”


•	Add a Transaction
#### Endpoint: POST /transactions

![post](https://github.com/user-attachments/assets/65a2975e-8204-4605-9ad4-9d60ca1c94fa)
Add a new transaction to the database.

•	Update a Transaction
#### Endpoint: PUT /transactions/:id
#### Updates an existing transaction by its ID.

![put](https://github.com/user-attachments/assets/c21efa97-2b31-45b4-a530-a60165747276)


•	Delete a Transaction
####	Endpoint: DELETE /transactions/:id
#### Deletes an existing transaction by its ID.
![delete](https://github.com/user-attachments/assets/d55b8025-3b4d-41e8-b264-253b19dfc54f)

#### Summary of All Transactions

#### GET /transactions/summary

The GET /summary endpoint provides an overview of all transactions, including the total income, total expenses, and the current balance. Optionally, you can filter the summary by date range and category.

![summary](https://github.com/user-attachments/assets/9576848e-fea9-46af-ac09-e73dd656257e)



### Technologies Used

•	Backend: Node.js, Express.js

•	Database: SQLite3

•	Authentication: JWT, bcrypt

•	Environment Variables: dotenv

