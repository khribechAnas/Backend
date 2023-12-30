const express = require("express");
const auth = require("../controllers/authController.js");
const authJwt = require("../middleware/secureRoute.js");

const authController = new auth();

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/verify", authController.verifyCode);

router.use(authJwt);

router.post("/logout", authController.logout);

router.post("/resetpassword", authController.resetPassword);

module.exports = router;
