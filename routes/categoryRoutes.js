const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

const categoryController = new CategoryController();

router.get("/", categoryController.getAllCategories);

router.post("/add", categoryController.addCategory);

router.delete("/remove/:categoryId", categoryController.removeCategory);

router.put("/update/:categoryId", categoryController.updateCategory);

module.exports = router;
