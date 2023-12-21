const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: Array,
      required: [true, "Please provide the list of products"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Please enter the total price"],
    },
    status: {
      type: String,
      required: [true, "Please enter the order status"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please enter the payment method"],
    },
    customer: {
      type: String,
      required: [true, "Please enter the customer name"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      type: Object,
      required: [true, "Please provide the shipping address"],
    },
    trackingNumber: {
      type: String,
    },
    billingAddress: {
      type: Object,
      required: [true, "Please provide the billing address"],
    },
    orderNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
