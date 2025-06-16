const express = require("express");
const router = express.Router();
const productPromotionController = require("../controllers/productPromotion.controller");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");

// Tạo mới một product promotion
router.post("/", verifyToken, isAdmin, productPromotionController.createProductPromotion);

// Lấy tất cả product promotions
router.get("/", productPromotionController.getAllProductPromotions);

// Xóa product promotion
router.delete("/", verifyToken, isAdmin, productPromotionController.deleteProductPromotion);

module.exports = router;
