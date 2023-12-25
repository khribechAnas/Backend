// notificationsRoutes.js
const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController");

// Create a notification
router.post("/add", notificationsController.createNotification);

// Update a notification
router.put("/update/:id", notificationsController.updateNotification);

module.exports = router;
