const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

const categoryController = new CategoryController();

// Route for adding a new category
router.post('/add', categoryController.addCategory);

// Route for removing a category
router.delete('/remove/:categoryId', categoryController.removeCategory);

// Route for updating a category
router.put('/update/:categoryId', categoryController.updateCategory);

module.exports = router;
