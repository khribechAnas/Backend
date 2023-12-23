const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

const productController = new ProductController();

router.get('/',productController.getAllProduct);
router.get('/:productId',productController.getProductById);
router.get('/choose/:categoryId', productController.chooseProductsByCategory);
router.post('/add', productController.addProduct);
router.delete('/remove/:productId', productController.removeProduct);
router.put('/update/:productId', productController.updateProduct);


module.exports = router;