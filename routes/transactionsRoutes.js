const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");
const verifyRoles = require("../middleware/verifyRoles");

router.get("/", transactionsController.getAllTransactions);
router.get("/:id", transactionsController.getTransaction);
router.get("/:orderId", transactionsController.getTransactionByOrderId);
router.get("/:userId", transactionsController.getTransactionByUserId);
// router.post("/add",verifyRoles(["admin"]), transactionsController.createTransaction);
// router.put("/update/:id",verifyRoles(["admin"]), transactionsController.updateTransaction);
router.delete("/delete/:id",verifyRoles(["admin"]), transactionsController.deleteTransaction);

module.exports = router;
