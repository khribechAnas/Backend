const express = require("express");
const router = express.Router();
const verifyRoles = require("../middleware/verifyRoles.js");
const handleFileUploadss = require("../firebase/firebasemiddleware");
const ProductController = require("../controllers/ProductController");

const productController = new ProductController();

router.get("/", productController.getAllProduct);
router.get("/:productId", productController.getProductById);
router.get("/choose/:categoryId", productController.chooseProductsByCategory);
router.post("/add", verifyRoles(["admin"]), productController.addProduct);
router.delete(
  "/delete/:productId",
  verifyRoles(["admin"]),
  handleFileUploadss.handleFileUploads,
  productController.removeProduct
);
router.put(
  "/update/:productId",
  verifyRoles(["admin", "moderator"]),
  productController.updateProduct
);

module.exports = router;
