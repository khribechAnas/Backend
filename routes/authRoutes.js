const express = require("express");
const login = require("../controllers/authController.js");

const authController = new login();

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/resetpassword", authController.resetPassword);

module.exports = router;
