// shippingRoutes.js
const express = require("express");
const router = express.Router();
const shippingController = require("../controllers/shippingController");

router.get("/", shippingController.getAllShippings);
router.get("/:id", shippingController.getShipping);
router.get("/:orderId", shippingController.getShippingByOrderId);
router.post("/add", shippingController.createShipping);
router.put("/update/:id", shippingController.updateShipping);
router.delete("/delete/:id", shippingController.deleteShipping);

module.exports = router;
