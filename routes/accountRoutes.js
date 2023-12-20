const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');

const accountController = new AccountController();

// Route for user registration
router.post('/register', accountController.register);

// Route for user login
router.post('/login', accountController.login);

// Route for user logout
router.post('/logout', accountController.logout);

// Route for resetting the password
router.post('/resetpassword', accountController.resetPassword);

module.exports = router;

