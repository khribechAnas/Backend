const ProductModel = require('../models/ProductModel');

class ProductController {
  async addProduct(req, res) {
    try {
      const newProduct = await ProductModel.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeProduct(req, res) {
    try {
      const { productId } = req.params;
      const removedProduct = await ProductModel.findByIdAndDelete(productId);

      if (!removedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.status(200).json({ message: 'Product removed successfully', removedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateProduct(req, res) {
    try {
      const { productId } = req.params;
      const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async chooseProductsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const products = await ProductModel.find({ categoryId });

      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = ProductController;
