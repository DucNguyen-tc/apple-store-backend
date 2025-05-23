const express = require('express');
const router = express.Router();
const warrantyClaimController = require('../controllers/warrantyClaim.controller');

// Tạo yêu cầu bảo hành mới
router.post('/', warrantyClaimController.createWarrantyClaim);

// Lấy tất cả yêu cầu bảo hành
router.get('/', warrantyClaimController.getAllWarrantyClaims);

// Lấy yêu cầu bảo hành theo id
router.get('/:id', warrantyClaimController.getWarrantyClaimById);

// Cập nhật yêu cầu bảo hành
router.put('/:id', warrantyClaimController.updateWarrantyClaim);

// Xóa yêu cầu bảo hành
router.delete('/:id', warrantyClaimController.deleteWarrantyClaim);

// Lấy yêu cầu bảo hành theo user_id
router.get('/user/:userId', warrantyClaimController.getWarrantyClaimsByUserId);

// Lấy yêu cầu bảo hành theo product_id
router.get('/product/:productId', warrantyClaimController.getWarrantyClaimsByProductId);

module.exports = router; 