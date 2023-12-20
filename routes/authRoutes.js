import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post('/register', accountController.register);


router.post('/login', accountController.login);


router.post('/logout', accountController.logout);


router.post('/resetpassword', accountController.resetPassword);

export default router;
