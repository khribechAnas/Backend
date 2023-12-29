const CategoryModel = require("../models/CategoryModel");

class CategoryController {
  async addCategory(req, res) {
    try {
      const newCategory = await CategoryModel.create(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async removeCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const removedCategory = await CategoryModel.findByIdAndDelete(categoryId);

      if (!removedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res
        .status(200)
        .json({ message: "Category removed successfully", removedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        req.body,
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res
        .status(200)
        .json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getAllCategories(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 3;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 2;
      const totalItems = pageSize * itemsPerPage;
      const skip = (page - 1) * totalItems;
      //Filters
      const filters = {};
      if (req.query.name) {
        filters.name = req.query.name;
      }
      const categories = await CategoryModel.find(filters)
        .skip(skip)
        .limit(totalItems);
      //pagination
      const paginatedCategories = [];
      for (let i = 0; i < totalItems; i += itemsPerPage) {
        paginatedCategories.push(categories.slice(i, i + itemsPerPage));
      }

      return res.status(200).json({ paginatedCategories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = CategoryController;
