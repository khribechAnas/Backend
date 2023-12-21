// shippingRoutes.js
const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

// Create a shipping
router.post('/add', shippingController.createShipping);

// Get a specific shipping
router.get('/displayOne/:id', shippingController.getShipping);

// Update a shipping
router.put('/update/:id', shippingController.updateShipping);

// Delete a shipping
router.delete('/delete/:id', shippingController.deleteShipping);

// Get all shippings
router.get('/displayAll', shippingController.getAllShippings);

module.exports = router;
