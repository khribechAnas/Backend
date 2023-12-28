const AccountModel = require("../models/AccountModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

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

      // Envoi de l'e-mail de confirmation
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.addEmail,
          pass: process.env.passapp,
        },
      });

      // Contenu du message
      const message = {
        from: process.env.addEmail,
        to: email,
        subject: "Confirmation ",
        html: "<h1>Thank you for signing up! Your account has been successfully created.</h1>",
      };

      // Envoi du message
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.error("Error sending confirmation email", err);
        } else {
          console.log("confirmation sending email:", info.response);
        }
      });

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
      
      // Generate a JWT token
      const token = jwt.sign(
        { accountId: account._id },
        process.env.SECRET_KEY
      );

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
