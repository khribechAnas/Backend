const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "please enter the fullname"],
      unique: [true, "exist fullname"],
    },
    email: {
      type: String,
      required: [true, "please enter the email"],
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter the password"],
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    wishlist: {
      type: Array,
      default: [],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
      default: Date.now,
    },
    verificationCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const AccountModel = mongoose.model("Account", accountSchema);

module.exports = AccountModel;
