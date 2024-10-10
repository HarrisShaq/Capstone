const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure you import your User model
const { createUser, loginUser } = require('../controllers/userController');

// Route to register a new user
router.post('/register', createUser);

// Route to login an existing user
router.post('/login', loginUser);

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from MongoDB
        res.json(users); // Send the user data as JSON
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
