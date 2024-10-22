const db = require('../config/dbConfig'); // Your db config file

// Create the users table if it doesn't exist
const createUsersTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created or already exists');
        }
    });
};

// Call the function to create the table when the module is loaded
createUsersTable();

// Add a new user (registration)
exports.addUser = (userData, callback) => {
    const { username, password } = userData;
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
        callback(err);
    });
};

// Find user by username
exports.getUserByUsername = (username, callback) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        callback(err, row);
    });
};
