const express = require('express');
const router = express.Router();
const Promotion = require('../controllers/promotion.controller');

router.post('/', Promotion.createPromotion);
router.get('/', Promotion.getAllPromotions);
router.get('/:id', Promotion.getPromotionById);
router.put('/:id', Promotion.updatePromotion);
router.delete('/:id', Promotion.deletePromotion);

module.exports = router;