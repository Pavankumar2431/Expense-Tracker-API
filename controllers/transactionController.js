const db = require('../config/dbConfig'); 
const {addTransaction,getAllTransactions, getTransactionById,updateTransaction,deleteTransaction} = require('../models/transactionModel')
const transactionModel = require('../models/transactionModel'); // Adjust the path as necessary

// Get all transactions with pagination
exports.getAllTransactions = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to limit 10

    transactionModel.getAllTransactions(page, limit, (err, transactions) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve transactions' });
        }
        res.status(200).json({ transactions });
    });
};

// Add a new transaction
exports.createTransaction = (req, res) => {
    const { type, category, amount, date, description } = req.body;

    // Validate input
    if (!type || !category || amount == null || !date) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const transaction = { type, category, amount, date, description };
    addTransaction(transaction, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add transaction' });
        }
        res.status(201).json({ message: 'Transaction added successfully' });
    });
};

// Get all transactions
exports.getAllTransactions = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    // Ensure page and limit are positive integers
    if (page < 1 || limit < 1) {
        return res.status(400).json({ error: 'Page and limit must be positive integers' });
    }

    transactionModel.getAllTransactions(page, limit, (err, transactions) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve transactions' });
        }

        // Optionally, you might also want to send back the total count of transactions for frontend to calculate total pages
        transactionModel.getTransactionCount((err, count) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to retrieve transaction count' });
            }

            res.status(200).json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                transactions
            });
        });
    });
};
// Get a transaction by ID
exports.getTransactionById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve transaction' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(row);
    });
};

// Update a transaction by ID
exports.updateTransaction = (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;

    // Validate input
    if (!type || !category || amount == null || !date) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    db.run('UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?', 
    [type, category, amount, date, description, id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to update transaction' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction updated successfully' });
    });
};

// Delete a transaction by ID
exports.deleteTransaction = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM transactions WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete transaction' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    });
};

// Get summary of transactions
exports.getSummary = (req, res) => {
    const { startDate, endDate, category } = req.query;

    // Base query for calculating summary
    let query = `
        SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses,
        SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) AS balance
        FROM transactions
    `;

    // Array to hold query parameters
    const queryParams = [];

    // Add optional filtering by date range and category
    if (startDate && endDate) {
        query += ' WHERE date BETWEEN ? AND ?';
        queryParams.push(startDate, endDate);
    }

    if (category) {
        query += startDate && endDate ? ' AND' : ' WHERE';
        query += ' category = ?';
        queryParams.push(category);
    }

    db.get(query, queryParams, (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve summary' });
        }
        res.status(200).json(row);
    });
};

