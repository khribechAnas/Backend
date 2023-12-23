const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

router.get('/', transactionsController.getAllTransactions);
router.get('/:id', transactionsController.getTransaction);
router.get('/:orderId',transactionsController.getTransactionByOrderId);
router.get('/:userId',transactionsController.getTransactionByUserId);
router.post('/add', transactionsController.createTransaction);
router.put('/update/:id', transactionsController.updateTransaction);
router.delete('/delete/:id', transactionsController.deleteTransaction);


module.exports = router;
