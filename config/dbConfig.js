const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to the SQLite database file
const dbPath = path.resolve(__dirname, '../expenseTracker.db');

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');

        // Initialize the database tables if they don't exist
        db.run(`CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            description TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating transactions table:', err.message);
            } else {
                console.log('Transactions table created or already exists');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating categories table:', err.message);
            } else {
                console.log('Categories table created or already exists');
            }
        });
    }
});

module.exports = db;
