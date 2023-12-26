const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/ordersController");

const orderController = new OrderController();

router.get("/", orderController.getAllOrders);
router.get("/:userId", orderController.getOrderByUserId);
router.get("/:orderId", orderController.getOrderById);
router.put("/update/:orderId", orderController.updateOrder);
router.post("/add", orderController.addOrder);
router.delete("/delete/:orderId", orderController.deleteOrder);

module.exports = router;
