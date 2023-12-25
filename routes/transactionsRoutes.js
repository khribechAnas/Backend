const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

// Create a transaction
router.post("/add", transactionsController.createTransaction);

// Get a specific transaction
router.get("/displayOne/:id", transactionsController.getTransaction);

// Update a transaction
router.put("/update/:id", transactionsController.updateTransaction);

// Delete a transaction
router.delete("/delete/:id", transactionsController.deleteTransaction);

router.get("/displayAll", transactionsController.getAllTransactions);

module.exports = router;
