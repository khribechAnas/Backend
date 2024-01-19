const ProductModel = require("../models/ProductModel");

class ProductController {
  async addProduct(req, res) {
    try {
      const newProduct = await ProductModel.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async removeProduct(req, res) {
    try {
      const { productId } = req.params;
      const removedProduct = await ProductModel.findByIdAndRemove(productId);

      if (!removedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res
        .status(200)
        .json({ message: "Product removed successfully", removedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateProduct(req, res) {
    try {
      const { productId } = req.params;
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async chooseProductsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const products = await ProductModel.find({ categoryId });

      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllProduct(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 3;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 2;

      // Calculate the total number of items to retrieve
      const totalItems = pageSize * itemsPerPage;

      // Calculate the skip value based on the total items and page number
      const skip = (page - 1) * totalItems;
      //Filters
      const filters = {};
      if (req.query.title) {
        filters.title = req.query.title;
      }
      // Fetch a subset of products using pagination parameters
      const products = await ProductModel.find(filters).skip(skip).limit(totalItems);

      // Return the paginated result, dividing the items into pages
      const paginatedProducts = [];
      for (let i = 0; i < totalItems; i += itemsPerPage) {
        paginatedProducts.push(products.slice(i, i + itemsPerPage));
      }

      return res.status(200).json({ paginatedProducts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getProductById(req, res) {
    try {
      const { productId } = req.params;
      const product = await ProductModel.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = ProductController;
