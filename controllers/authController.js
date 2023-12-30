const AccountModel = require("../models/AccountModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/sendEmail");
const { generateString } = require("../utils/generateString");

class AuthController {
  async register(req, res) {
    try {
      const { fullname, email, password } = req.body;
      const existingAccount = await AccountModel.findOne({ email });

      if (existingAccount) {
        return res
          .status(400)
          .json({ error: "Email address is already registered" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      function getRole() {
        if (email === process.env.ADMIN_EMAIL) {
          return "admin";
        } else if (email === process.env.MODERATOR_EMAIL) {
          return "moderator";
        } else {
          return "user";
        }
      }

      sendEmail(
        email,
        "<h1>Thank you for signing up! Your account has been successfully created.</h1>"
      );

      const newAccount = await AccountModel.create({
        fullname,
        email,
        password: hashedPassword,
        role: getRole(),
      });

      // Redirection vers la page de connexion
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
      const samePass = await await bcrypt.compare(password, account.password);
      if (!samePass) {
        return res.status(401).json({ error: "password not correct" });
      }

      //store the user in a session
      req.session.user = { accountId: account._id, email: account.email };

      // send code
      const code = generateString();
      const message = `Your verification Code is this: ${code}`;
      sendEmail(email, message);

      // Update last login timestamp
      account.lastLogin = new Date();
      account.verificationCode = code;
      await account.save();

      // Send the token and account details in the response
      res.status(200).json({ account });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async verifyCode(req, res) {
    try {
      const { code } = req.body;
      const user = req.session.user;

      if (!user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const account = await AccountModel.findById(user.accountId);
      if (!account) {
        return res.status(401).json({ error: "Invalid account" });
      }
      const storedVerificationCode = account.verificationCode;
      if (code === storedVerificationCode) {
        const token = jwt.sign(
          { accountId: account._id, role: account.role },
          process.env.SECRET_KEY
        );
        res.json({
          success: true,
          token,
          message: "Verification successful. User authenticated.",
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid verification code" });
      }
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
