const db = require('../config/dbConfig'); 

// Function to add a transaction
const addTransaction = (transaction, callback) => {
    const { type, category, amount, date, description } = transaction;
    const lowerCaseType = type.toLowerCase(); // Convert type to lowercase
    const lowerCaseCategory = category.toLowerCase();
    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`, 
        [lowerCaseType, lowerCaseCategory, amount, date, description], callback);
};

// Function to get all transactions
const getAllTransactions = (page, limit, callback) => {
    const offset = (page - 1) * limit; // Calculate offset
    const query = 'SELECT * FROM transactions LIMIT ? OFFSET ?'; // Modify for your DB syntax

    db.all(query, [limit, offset], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};
// Add this method to your transaction model
const getTransactionCount = (callback) => {
    const query = 'SELECT COUNT(*) AS count FROM transactions'; // Adjust for your DB syntax
    db.all(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0].count); // Assuming results[0].count gives total count
    });
};

// Function to get a transaction by ID
const getTransactionById = (id, callback) => {
    db.get(`SELECT * FROM transactions WHERE id = ?`, [id], callback);
};

// Function to update a transaction by ID
const updateTransactionById = (id, updatedData, callback) => {
    const { type, category, amount, date, description } = updatedData;
    const lowerCaseType = type.toLowerCase(); // Convert type to lowercase
    const lowerCaseCategory = category.toLowerCase();
    db.run(`UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`, 
        [lowerCaseType, lowerCaseCategory, amount, date, description, id], callback);
};

// Function to delete a transaction by ID
const deleteTransactionById = (id, callback) => {
    db.run(`DELETE FROM transactions WHERE id = ?`, [id], callback);
};

module.exports = {
    addTransaction,
    getAllTransactions,
    getTransactionCount,
    getTransactionById,
    updateTransactionById,
    deleteTransactionById,
};
