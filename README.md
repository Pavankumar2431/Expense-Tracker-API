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

This endpoint provides a summary of all transactions, including total income, total expenses, and the balance.

### Response:

{
  "totalIncome": 5000,
  "totalExpense": 3000,
  "balance": 2000
}


### Technologies Used

•	Backend: Node.js, Express.js

•	Database: SQLite3

•	Authentication: JWT, bcrypt

•	Environment Variables: dotenv

