const Promotion = require("../models/promotion.model");

// Tạo mới promotion
exports.createPromotion = async (req, res, next) => {
  try {
    const id = await Promotion.createPromotion(req.body);
    res.status(201).json({
      message: "Promotion created successfully",
      id: id,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách promotions
exports.getAllPromotions = async (req, res, next) => {
  try {
    const promotions = await Promotion.getAllPromotions();
    res.status(200).json(promotions);
  } catch (error) {
    next(error);
  }
};

// Lấy promotion theo id
exports.getPromotionById = async (req, res, next) => {
  try {
    const promotion = await Promotion.getPromotionById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.status(200).json(promotion);
  } catch (error) {
    next(error);
  }
};

// Cập nhật promotion theo id
exports.updatePromotion = async (req, res, next) => {
  try {
    const updated = await Promotion.updatePromotion(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.status(200).json({ message: "Promotion updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Xóa promotion theo id
exports.deletePromotion = async (req, res, next) => {
  try {
    const deleted = await Promotion.deletePromotion(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (error) {
    next(error);
  }
};
