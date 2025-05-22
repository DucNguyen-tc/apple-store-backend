const express = require('express');
const router = express.Router();
const Product = require('../controllers/product.controller');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

// Các route cần quyền admin
router.post('/', verifyToken, isAdmin, Product.createProduct);
router.put('/:id', verifyToken, isAdmin, Product.updateProduct);
router.delete('/:id', verifyToken, isAdmin, Product.deleteProduct);

// Các route không cần quyền admin
router.get('/', Product.getAllProducts);
router.get('/:id', Product.getProductById);

module.exports = router;