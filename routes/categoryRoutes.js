const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const verifyRoles = require("../middleware/verifyRoles");

const categoryController = new CategoryController();

router.get("/", categoryController.getAllCategories);

router.post("/add",verifyRoles(["admin"]), categoryController.addCategory);

router.delete('/delete/:categoryId',verifyRoles(["admin"]), categoryController.removeCategory);


router.put('/update/:categoryId',verifyRoles(["admin", "moderator"]), categoryController.updateCategory);

module.exports = router;
