const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// Using middleware to parse the request body as JSON
router.use(express.json());

// Authentication routes
router.post('/login', (req, res) => {
    // Assuming the request body contains JSON with email and password properties
    const { email, password } = req.body;

    const login = {
        email: email,
        password: password
    };

    res.status(200).send(login);

});



/**
 * Inserts a new user into the database.
 * 
 * @param {string} email - The email of the user.
 * @param {string} name - The name of the user.
 * @param {string} password - The password of the user.
 * @param {string} gender - The gender of the user.
 * @param {string} phoneNumber - The phone number of the user.
 * @returns {Object} - An object representing the inserted user or an error message.
 */
async function insertUser(email, name, password, gender, phoneNumber) {
    // SQL query to insert a new user into the 'users' table and return the inserted row
    const query = 'INSERT INTO users(email, name, password, gender, phone_number) VALUES($1, $2, $3, $4, $5) RETURNING *';

    try {
        // Execute the SQL query using the database connection pool
        const result = await pool.query(query, [email, name, password, gender, phoneNumber]);

        // Return the inserted user (the first row in the result)
        return result.rows[0];
    } catch (error) {
        // Check if the error is due to a duplicate phone number
        if (error.code === '23505' && error.constraint === 'users_phone_number_key') {
            // Return a specific error message for duplicate phone numbers
            return "PHONE NUMBER ALREADY IN USE";
        } else {
            // Log and rethrow other errors
            console.error('Error inserting user:', error);
            throw error;
        }
    }
}



/**
 * Checks if a user with the given email and phone number already exists in the database.
 * 
 * @param {string} email - The email of the user to check.
 * @param {string} phoneNumber - The phone number of the user to check.
 * @returns {boolean} - True if a user with the specified email and phone number exists, false otherwise.
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
async function ifUserExists(email, phoneNumber) {
    // SQL query to select users with the given email and phone number
    const query = "SELECT * FROM users WHERE email LIKE $1 AND phone_number LIKE $2;";

    try {
        // Execute the SQL query using the database connection pool
        const result = await pool.query(query, [email, phoneNumber]);

        // Return true if at least one user is found with the specified email and phone number
        return result.rowCount > 0;
    } catch (error) {
        // Log the error and rethrow it to handle it in the calling code
        console.error('Error checking if user exists:', error);
        throw error;
    }
}


/**
 * POST route for user signup.
 * 
 * @param {Object} req - Express request object containing user signup data in the request body.
 * @param {Object} res - Express response object to send the HTTP response.
 */
router.post('/signup', async (req, res) => {
    // Destructuring user signup data from the request body
    const { email, name, password, gender, phoneNumber } = req.body;

    // Creating an object with organized signup data
    const signUp = {
        email: email,
        name: name,
        password: password,
        gender: gender,
        phoneNumber: phoneNumber
    }

    try {
        // Checking if a user with the provided email already exists in the database
        const userExists = await ifUserExists(signUp.email);

        if (userExists) {
            // Sending a conflict response if a user with the provided email already exists
            res.status(409).send({
                message: 'User with the provided email already exists.'
            });
        } else {
            // Inserting a new user into the database if the email is not already in use
            const newUser = await insertUser(signUp.email, signUp.name, signUp.password, signUp.gender, signUp.phoneNumber);
            // Sending a success response with the newly inserted user data
            res.status(201).send(newUser);
        }
    } catch (err) {
        // Handling errors and sending an internal server error response
        console.error('Error in signup route:', err);
        res.status(500).send({
            message: 'Something went wrong. Please try again later.'
        });
    }
});


module.exports = router;
