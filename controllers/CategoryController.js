const CategoryModel = require('../models/CategoryModel');

class CategoryController {
  async addCategory(req, res) {
    try {
      const newCategory = await CategoryModel.create(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const removedCategory = await CategoryModel.findByIdAndDelete(categoryId);

      if (!removedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json({ message: 'Category removed successfully', removedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, req.body, { new: true });

      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getAllCategories(req, res) {
    try {
      const categories = await CategoryModel.find();
      res.status(200).json({ categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = CategoryController;
