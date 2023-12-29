// shippingRoutes.js
const express = require("express");
const router = express.Router();
const shippingController = require("../controllers/shippingController");
const verifyRoles = require("../middleware/verifyRoles");

router.get("/", shippingController.getAllShippings);
router.get("/:id", shippingController.getShipping);
router.get("/:orderId", shippingController.getShippingByOrderId);
// router.post("/add",verifyRoles(["admin"]), shippingController.createShipping);
// router.put("/update/:id",verifyRoles(["admin", "moderator"]), shippingController.updateShipping);
router.delete("/delete/:id",verifyRoles(["admin"]), shippingController.deleteShipping);

module.exports = router;