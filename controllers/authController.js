const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../models/userModel');
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
// Register a new user
exports.register = (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Failed to hash password' });

        userModel.addUser({ username, password: hash }, (err) => {
            if (err) return res.status(500).json({ error: 'Failed to register user' });
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};
// Login user
exports.login = (req, res) => {
    const { username, password } = req.body;

    userModel.getUserByUsername(username, (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });

        // Compare the password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) return res.status(401).json({ error: 'Invalid credentials' });

            // Generate JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        });
    });
};

//auth middleware
exports.verifyToken = (req, res, next) => {
    const jwtToken = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ') 
        ? req.headers['authorization'].split(' ')[1] 
        : null;


    if (!jwtToken) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(jwtToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("Token Verification Error:", err); // Log any verification errors
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.userId = decoded.id; 
        next(); 
    });
};