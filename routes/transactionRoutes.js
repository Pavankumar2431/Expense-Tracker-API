const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authController = require('../controllers/authController'); // Your auth controller


// User registration and login routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Transaction routes
router.post('/transactions', authController.verifyToken, transactionController.createTransaction);
router.get('/transactions', authController.verifyToken, transactionController.getAllTransactions);
router.get('/transactions/:id', authController.verifyToken, transactionController.getTransactionById);
router.put('/transactions/:id', authController.verifyToken, transactionController.updateTransaction);
router.delete('/transactions/:id', authController.verifyToken, transactionController.deleteTransaction);
router.get('/summary', authController.verifyToken, transactionController.getSummary);

module.exports = router;
