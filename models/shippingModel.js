const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Please enter the shipping type"],
    },
    cost: {
      type: Number,
      required: [true, "Please enter the shipping cost"],
    },
    estimatedDelivery: {
      type: String,
      required: [true, "Please enter the estimated delivery time"],
    },
    regions: {
      type: Array,
      required: [true, "Please provide the list of regions"],
    },
  },
  { timestamps: true }
);

const ShippingModel = mongoose.model("Shipping", shippingSchema);

module.exports = ShippingModel;
