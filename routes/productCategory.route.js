const express = require("express");
const router = express.Router();
const ProductCategoryController = require("../controllers/productCategory.controller");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");

// Middleware to verify token and check admin role
router.post("/", verifyToken, isAdmin, ProductCategoryController.createProductCategory);
router.put("/:id", verifyToken, isAdmin, ProductCategoryController.updateProductCategory);
router.delete("/:id", verifyToken, isAdmin, ProductCategoryController.deleteProductCategory);

// route public
router.get("/:id", ProductCategoryController.getProductCategoryById);
router.get("/", ProductCategoryController.getAllProductCategories);
//Làm thêm verify token ở đây
module.exports = router;