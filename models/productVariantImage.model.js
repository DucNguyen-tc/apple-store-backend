const db = require("../config/db");

// Tạo mới một product variant image
async function createProductVariantImage(productVariantImage) {
  try {
    const { productVariantId, imageUrl } = productVariantImage;
    const [result] = await db.execute(
      "INSERT INTO product_variant_image (productVariantId, imageUrl) VALUES (?, ?)",
      [productVariantId, imageUrl]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating product variant image:", error);
    throw error;
  }
}

// Lấy tất cả product variant images
async function getAllProductVariantImage() {
  try {
    const [result] = await db.execute("SELECT * FROM product_variant_image");
    return result;
  } catch (error) {
    console.error("Error fetching all product variant images:", error);
    throw error;
  }
}

// Lấy product variant image theo id
async function getProductVariantImageById(id) {
  try {
    const [result] = await db.execute(
      "SELECT * FROM product_variant_image WHERE id = ?",
      [id]
    );
    return result[0];
  } catch (error) {
    console.log("Error fetching product variant image:", error);
    throw error;
  }
}

// Cập nhật product variant image theo id
async function updateProductVariantImage(id, productVariantImage) {
  try {
    const { productVariantId, imageUrl } = productVariantImage;
    const [result] = await db.execute(
      "UPDATE product_variant_image SET productVariantId = ?, imageUrl = ? WHERE id = ?",
      [productVariantId, imageUrl, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating product variant image:", error);
    throw error;
  }
}

// Xóa product variant image theo id
async function deleteProductVariantImage(id) {
  try {
    const [result] = await db.execute(
      "DELETE FROM product_variant_image WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting product variant image:", error);
    throw error;
  }
}

module.exports = {
  createProductVariantImage,
  getAllProductVariantImage,
  getProductVariantImageById,
  updateProductVariantImage,
  deleteProductVariantImage,
};
