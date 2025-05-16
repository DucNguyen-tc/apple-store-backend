const ProductVariantImage = require('../models/productVariantImage.model');

// Tạo mới product variant image
exports.createProductVariantImage = async (req, res, next) => {
    try {
        const id = await ProductVariantImage.createProductVariantImage(req.body);
        res.status(201).json({
            message: "Product variant image created successfully",
            id: id,
        });
    } catch (error) {
        next(error);      
    }
}

// Lấy danh sách product variant images
exports.getAllProductVariantImages = async (req, res, next) => {
    try {
        const productVariantImages = await ProductVariantImage.getAllProductVariantImage();
        res.status(200).json(productVariantImages);
    } catch (error) {
        next(error);
    }
}

// Lấy product variant image theo id
exports.getProductVariantImageById = async (req, res, next) => {
    try {
        const productVariantImage = await ProductVariantImage.getProductVariantImageById(req.params.id);
        if (!productVariantImage) {
            return res.status(404).json({ message: "Product variant image not found" });
        }
        res.status(200).json(productVariantImage);
    } catch (error) {
        next(error);
    }
}

// Cập nhật product variant image theo id
exports.updateProductVariantImage = async (req, res, next) => {
    try {
        const updated = await ProductVariantImage.updateProductVariantImage(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Product variant image not found" });
        }
        res.status(200).json({ message: "Product variant image updated successfully" });
    } catch (error) {
        next(error);
    }
}

// Xóa product variant image theo id
exports.deleteProductVariantImage = async (req, res, next) => {
    try {
        const deleted = await ProductVariantImage.deleteProductVariantImage(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Product variant image not found" });
        }
        res.status(200).json({ message: "Product variant image deleted successfully" });
    } catch (error) {
        next(error);
    }
}