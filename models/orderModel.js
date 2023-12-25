const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide the list of products"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Please enter the user ID"],
    },
    list:{
      type : Array
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
