// orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');

// Create an order
router.post('/add', orderController.createOrder);

// Get a specific order
router.get('/displayOne/:id', orderController.getOrder);

// Update an order
router.put('/update/:id', orderController.updateOrder);

// Delete an order
router.delete('/delete/:id', orderController.deleteOrder);

// Get all orders
router.get('/displayAll', orderController.getAllOrders);

module.exports = router;
