const AccountModel = require("../models/AccountModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  async register(req, res) {
    try {
      const { fullname, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAccount = await AccountModel.create({
        fullname,
        email,
        password: hashedPassword,
      });
      res.status(201).json(newAccount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const account = await AccountModel.findOne({ email });

      if (!account) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const samePass = await bcrypt.compare(password, account.password);
      if (!samePass) {
        return res.status(401).json({ error: "password not correct" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { accountId: account._id },
        process.env.SECRET_KEY
      );

      if (email === process.env.ADMIN_EMAIL) {
        account.isAdmin = true;
      }

      // Update last login timestamp
      account.lastLogin = new Date();
      await account.save();

      // Send the token and account details in the response
      res.status(200).json({ token, account });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async logout(req, res) {
    try {
      const { token } = req.body;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const { accountId } = decoded;
      const account = await AccountModel.findById(accountId);
      account.lastLogin = new Date();
      await account.save();
      res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const { accountId } = decoded;
      const account = await AccountModel.findById(accountId);
      account.resetPasswordToken = "";
      account.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      account.password = hashedPassword;
      await account.save();
      res.status(200).json({ message: "Successfully reset password" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
module.exports = AuthController;
