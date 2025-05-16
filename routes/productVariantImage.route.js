const express = require('express');
const router = express.Router();
const productVariantImageController = require('../controllers/productVariantImage.controller');

router.post('/', productVariantImageController.createProductVariantImage);
router.get('/', productVariantImageController.getAllProductVariantImages);
router.get('/:id', productVariantImageController.getProductVariantImageById);
router.put('/:id', productVariantImageController.updateProductVariantImage);
router.delete('/:id', productVariantImageController.deleteProductVariantImage);

module.exports = router;