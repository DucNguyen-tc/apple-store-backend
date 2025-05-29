const ProductVariantImage = require("../models/productVariantImage.model");

// Tạo mới productVariantImage với upload ảnh
exports.createProductVariantImage = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const { productVariantId } = req.body;
    // Kiểm tra file upload
    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng upload ảnh!" });
    }
    // Kiểm tra productVariantId
    if (!productVariantId || isNaN(Number(productVariantId))) {
      return res
        .status(400)
        .json({ message: "Thiếu hoặc sai productVariantId!" });
    }
    // Lấy đường dẫn ảnh đã upload
    const imageUrl = req.file.path.replace(/\\/g, "/"); // Đảm bảo đường dẫn chuẩn
    const newImage = { productVariantId: Number(productVariantId), imageUrl };
    const insertId = await ProductVariantImage.createProductVariantImage(
      newImage
    );
    res.status(201).json({ id: insertId, ...newImage });
  } catch (error) {
    console.error("Lỗi khi tạo product variant image:", error);
    res.status(500).json({
      message: "Lỗi khi tạo product variant image",
      error: error.message,
    });
  }
};

// Lấy danh sách product variant images
exports.getAllProductVariantImages = async (req, res, next) => {
  try {
    const productVariantImages =
      await ProductVariantImage.getAllProductVariantImage();
    res.status(200).json(productVariantImages);
  } catch (error) {
    next(error);
  }
};

// Lấy product variant image theo id
exports.getProductVariantImageById = async (req, res, next) => {
  try {
    const productVariantImage =
      await ProductVariantImage.getProductVariantImageById(req.params.id);
    if (!productVariantImage) {
      return res
        .status(404)
        .json({ message: "Product variant image not found" });
    }
    res.status(200).json(productVariantImage);
  } catch (error) {
    next(error);
  }
};

// Cập nhật product variant image theo id
exports.updateProductVariantImage = async (req, res, next) => {
  try {
    const updated = await ProductVariantImage.updateProductVariantImage(
      req.params.id,
      req.body
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Product variant image not found" });
    }
    res
      .status(200)
      .json({ message: "Product variant image updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Xóa product variant image theo id
exports.deleteProductVariantImage = async (req, res, next) => {
  try {
    const deleted = await ProductVariantImage.deleteProductVariantImage(
      req.params.id
    );
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Product variant image not found" });
    }
    res
      .status(200)
      .json({ message: "Product variant image deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getImagesByVariantId = async (req, res, next) => {
  try {
    const images = await ProductVariantImage.getImagesByVariantId(
      req.params.variantId
    );
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};

exports.setThumbnailImage = async (req, res, next) => {
  try {
    const { id, variantId } = req.body;
    await ProductVariantImage.unsetAllThumbnails(variantId);
    await ProductVariantImage.setThumbnail(id);
    res.status(200).json({ message: "Đã đặt ảnh làm ảnh đại diện." });
  } catch (error) {
    next(error);
  }
};
