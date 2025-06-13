const db = require("../config/db");

// Tạo mới ảnh
async function createProductVariantImage({ productVariantId, imageUrl, isThumbnail = false }) {
  const [result] = await db.execute(
    "INSERT INTO product_variant_image (product_variant_id, image_url, is_thumbnail) VALUES (?, ?, ?)",
    [productVariantId, imageUrl, isThumbnail]
  );
  return result.insertId;
}

// Lấy tất cả ảnh
async function getAllProductVariantImage() {
  const [result] = await db.execute("SELECT * FROM product_variant_image");
  return result;
}

// Lấy ảnh theo ID
async function getProductVariantImageById(id) {
  const [result] = await db.execute(
    "SELECT * FROM product_variant_image WHERE id = ?",
    [id]
  );
  return result[0];
}

// Lấy ảnh theo productVariantId
async function getImagesByVariantId(variantId) {
  const [result] = await db.execute(
    "SELECT * FROM product_variant_image WHERE productVariantId = ?",
    [variantId]
  );
  return result;
}

// Cập nhật ảnh
async function updateProductVariantImage(id, { productVariantId, imageUrl, isThumbnail }) {
  const [result] = await db.execute(
    "UPDATE product_variant_image SET product_variant_id = ?, image_url = ?, is_thumbnail = ? WHERE id = ?",
    [productVariantId, imageUrl, isThumbnail, id]
  );
  return result.affectedRows > 0;
}

// Xoá ảnh
async function deleteProductVariantImage(id) {
  const [result] = await db.execute(
    "DELETE FROM product_variant_image WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

// Xoá ảnh theo variant_id
async function deleteImageByVariantId(variant_id){
  const [result] = await db.execute(
    "DELETE FROM product_variant_image WHERE productVariantId = ?",
    [variant_id]
  );
  return result.affectedRows > 0;
}

// Reset tất cả ảnh về is_thumbnail = false
async function unsetAllThumbnails(variantId) {
  await db.execute(
    "UPDATE product_variant_image SET isThumbnail = FALSE WHERE productVariantId = ?",
    [variantId]
  );
}

// Set 1 ảnh là thumbnail
async function setThumbnail(thumbnailUrl) {
  await db.execute(
    "UPDATE product_variant_image SET isThumbnail = TRUE WHERE imageUrl = ?",
    [thumbnailUrl]
  );
}

module.exports = {
  createProductVariantImage,
  getAllProductVariantImage,
  getProductVariantImageById,
  updateProductVariantImage,
  deleteProductVariantImage,
  getImagesByVariantId,
  unsetAllThumbnails,
  setThumbnail,
  deleteImageByVariantId
};
