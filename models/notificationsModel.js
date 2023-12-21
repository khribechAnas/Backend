const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Please enter the user ID"],
    },
    type: {
      type: String,
      required: [true, "Please enter the notification type"],
    },
    message: {
      type: String,
      required: [true, "Please enter the notification message"],
    },
    status: {
      type: String,
      required: [true, "Please enter the notification status"],
    },
  },
  { timestamps: true }
);

const NotificationsModel = mongoose.model("Notifications", notificationsSchema);

module.exports = NotificationsModel;
