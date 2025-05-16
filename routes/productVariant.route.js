const express = require("express");
const router = express.Router();
const ProductVariantController = require("../controllers/productVariant.controller");

router.get("/", ProductVariantController.getAllProductVariants);
router.get("/:id", ProductVariantController.getProductVariantById);

// Tạo mới một product variant
router.post("/", ProductVariantController.createProductVariant);

// Cập nhật product variant theo id
router.put("/:id", ProductVariantController.updateProductVariant);

// Xóa product variant theo id
router.delete("/:id", ProductVariantController.deleteProductVariant);

module.exports = router;
