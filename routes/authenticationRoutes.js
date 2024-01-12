const express = require('express');
const router = express.Router();

// Authentication routes
router.get('/login', (req, res) => {
    // Your authentication logic for login
    res.send('Login route');
});

router.get('/signup', (req, res) => {
    // Your authentication logic for signup
    res.send('Signup route');
});

module.exports = router;
