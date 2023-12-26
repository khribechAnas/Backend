const express = require("express");
const login = require("../controllers/authController.js");
const authJwt = require("../middleware/secureRoute.js")

const authController = new login();

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.use(authJwt);

router.post("/logout", authController.logout);

router.post("/resetpassword", authController.resetPassword);

module.exports = router;
