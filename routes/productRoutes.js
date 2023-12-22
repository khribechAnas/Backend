const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

const productController = new ProductController();


router.post('/add', productController.addProduct);
router.delete('/remove/:productId', productController.removeProduct);
router.put('/update/:productId', productController.updateProduct);
router.get('/choose/:categoryId', productController.chooseProductsByCategory);


module.exports = router;