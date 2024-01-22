const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/ordersController");
const verifyRoles = require("../middleware/verifyRoles");

const orderController = new OrderController();

router.get("/", orderController.getAllOrders);
router.get("/:userId", orderController.getOrderByUserId);
router.get("/:orderId", orderController.getOrderById);
router.put("/update/:orderId",verifyRoles(["admin","moderator"]), orderController.updateOrder);
// router.post("/add",verifyRoles(["admin"]), orderController.addOrder);
router.delete("/delete/:orderId",verifyRoles(["admin"]), orderController.deleteOrder);

module.exports = router;
