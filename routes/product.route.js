const express = require('express');
const router = express.Router();
const Product = require('../controllers/product.controller');

router.post('/', Product.createProduct);
router.get('/', Product.getAllProducts);
router.get('/:id', Product.getProductById);
router.put('/:id', Product.updateProduct);
router.delete('/:id', Product.deleteProduct);

module.exports = router;