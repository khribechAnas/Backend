const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, "Please enter the order ID"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, "Please enter the user ID"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter the transaction amount"],
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      required: [true, "Please enter the payment method"],
    },
    status: {
      type: String,
      required: [true, "Please enter the transaction status"],
    },
  },
  { timestamps: true }
);

const TransactionsModel = mongoose.model("Transactions", transactionsSchema);

module.exports = TransactionsModel;
