const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');

// Tạo cửa hàng mới
router.post('/', storeController.createStore);

// Lấy tất cả cửa hàng
router.get('/', storeController.getAllStores);

// Lấy cửa hàng theo id
router.get('/:id', storeController.getStoreById);

// Cập nhật cửa hàng
router.put('/:id', storeController.updateStore);

// Xóa cửa hàng
router.delete('/:id', storeController.deleteStore);

module.exports = router; 