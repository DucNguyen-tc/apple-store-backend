const express = require("express");
const router = express.Router();
const productPromotionController = require("../controllers/productPromotion.controller");

// Tạo mới một product promotion
router.post("/", productPromotionController.createProductPromotion);

// Lấy tất cả product promotions
router.get("/", productPromotionController.getAllProductPromotions);

// Xóa product promotion
router.delete("/", productPromotionController.deleteProductPromotion);

module.exports = router;
