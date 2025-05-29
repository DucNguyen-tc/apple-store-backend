const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('../middleware/verifyToken');

// Tạo cửa hàng mới
router.post('/', verifyToken, isAdmin, storeController.createStore);

// Lấy tất cả cửa hàng
router.get('/', storeController.getAllStores);

// Lấy cửa hàng theo id
router.get('/:id', storeController.getStoreById);

// Cập nhật cửa hàng
router.put('/:id', verifyToken, isAdmin, storeController.updateStore);

// Xóa cửa hàng
router.delete('/:id', verifyToken, isAdmin, storeController.deleteStore);

module.exports = router; 