const express = require('express');
const router = express.Router();
const Promotion = require('../controllers/promotion.controller');
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('../middleware/verifyToken');

router.get('/', Promotion.getAllPromotions);
router.get('/:id', Promotion.getPromotionById);


router.post('/',  verifyToken, isAdmin, Promotion.createPromotion);
router.put('/:id',  verifyToken, isAdmin, Promotion.updatePromotion);
router.delete('/:id',  verifyToken, isAdmin, Promotion.deletePromotion);

module.exports = router;