const express = require("express");
const getAllAccount = require("../controllers/accountController");

const accountController = new getAllAccount();

const router = express.Router();

router.get("/", accountController.getAllAccount);
router.get("/:id", accountController.getAccount);

router.delete("/delete/:id", accountController.deleteAccount);
router.put("/update/:id", accountController.updateAccount);

module.exports = router;
