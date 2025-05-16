const ProductVariant = require("../models/productVariant.model");

// Lấy danh sách tất cả product variants
exports.getAllProductVariants = async (req, res, next) => {
  try {
    const productVariants = await ProductVariant.getAllProductVariants();
    res.status(200).json(productVariants);
  } catch (error) {
    console.error("Error fetching product variants:", error);
    next(error);
  }
};

// Lấy product variant theo id
exports.getProductVariantById = async (req, res, next) => {
  try {
    const productVariant = await ProductVariant.getProductVariantById(
      req.params.id
    );
    if (!productVariant) {
      return res.status(404).json({ message: "Product variant not found" });
    }
    res.status(200).json(productVariant);
  } catch (error) {
    console.error("Error fetching product variant by ID:", error);
    next(error);
  }
};

// Tạo mới một product variant
exports.createProductVariant = async (req, res, next) => {
  try {
    const productVariant = req.body;
    const id = await ProductVariant.createProductVariant(productVariant);
    res.status(201).json({ id });
  } catch (error) {
    console.error("Error creating product variant:", error);
    next(error);
  }
};

// Cập nhật product variant theo id
exports.updateProductVariant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productVariant = req.body;
    const success = await ProductVariant.updateProductVariant(
      id,
      productVariant
    );
    if (success) {
      res.status(200).json({ message: "Product variant updated successfully" });
    } else {
      res.status(404).json({ message: "Product variant not found" });
    }
  } catch (error) {
    console.error("Error updating product variant:", error);
    next(error);
  }
};

// Xóa product variant theo id
exports.deleteProductVariant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await ProductVariant.deleteProductVariant(id);
    if (success) {
      res.status(200).json({ message: "Product variant deleted successfully" });
    } else {
      res.status(404).json({ message: "Product variant not found" });
    }
  } catch (error) {
    console.error("Error deleting product variant:", error);
    next(error);
  }
};
