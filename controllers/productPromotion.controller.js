const productPromotionModel = require("../models/productPromotion.model");

// Tạo mới một product promotion
async function createProductPromotion(req, res) {
  try {
    console.log(req.body)
    const { productVariantId, promotionId } = req.body;
    const success = await productPromotionModel.createProductPromotion({
      productVariantId,
      promotionId,
    });
    if (success) {
      res
        .status(201)
        .json({ message: "Product promotion created successfully" });
    } else {
      res.status(400).json({ error: "Failed to create product promotion" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating product promotion" });
  }
}

// Lấy tất cả product promotions
async function getAllProductPromotions(req, res) {
  try {
    const rows =
      await productPromotionModel.getAllProductPromotions();

    const mapping = {};
    for (const row of rows) {
      const variantId = row.productVariantId;
      const promoId = row.promotionId;
      if (!mapping[variantId]) mapping[variantId] = [];
      mapping[variantId].push(promoId);
    }

    res.json(mapping);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product promotions" });
  }
}

// Xóa product promotion
async function deleteProductPromotion(req, res) {
  try {
    const { productVariantId, promotionId } = req.body;
    const success = await productPromotionModel.deleteProductPromotion({
      productVariantId,
      promotionId,
    });
    if (success) {
      res
        .status(200)
        .json({ message: "Product promotion deleted successfully" });
    } else {
      res.status(404).json({ error: "Product promotion not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting product promotion" });
  }
}

module.exports = {
  createProductPromotion,
  getAllProductPromotions,
  deleteProductPromotion,
};
