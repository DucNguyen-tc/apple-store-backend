const express = require("express");
const router = express.Router();
const ProductVariantController = require("../controllers/productVariant.controller");
const isAdmin = require("../middleware/isAdmin");
const verifyToken = require("../middleware/verifyToken");

router.get("/", ProductVariantController.getAllProductVariants);
router.get("/:id", ProductVariantController.getProductVariantById);

// Tạo mới một product variant
router.post("/", verifyToken, isAdmin, ProductVariantController.createProductVariant);

// Cập nhật product variant theo id
router.put("/:id", verifyToken, isAdmin, ProductVariantController.updateProductVariant);

// Xóa product variant theo id
router.delete("/:id", verifyToken, isAdmin, ProductVariantController.deleteProductVariant);

module.exports = router;
