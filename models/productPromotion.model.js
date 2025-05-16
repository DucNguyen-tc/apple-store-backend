const db = require("../config/db");

//Tạo mới 1 product promotion
async function createProductPromotion({ productVariantId, promotionId }) {
  try {
    const sql =
      "INSERT INTO product_promotion (productVariantId, promotionId) VALUES (?, ?)";
    const [result] = await db.execute(sql, [productVariantId, promotionId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error creating product promotion:", error);
    throw error;
  }
}

//Lấy tất cả product promotions
async function getAllProductPromotions() {
  try {
    const sql = `
      SELECT pp.*, pv.color, pv.storage_capacity, promo.name AS promotion_name
      FROM PRODUCT_PROMOTION pp
      JOIN PRODUCT_VARIANT pv ON pv.id = pp.product_variant_id
      JOIN PROMOTION promo ON promo.id = pp.promotionId
    `;
    const [rows] = await db.execute(sql);
    return rows;
  } catch (error) {
    console.error("Error getting all product promotions:", error);
    throw error;
  }
}

//Xoá product promotion
async function deleteProductPromotion({ productVariantId, promotionId }) {
  try {
    const sql = "DELETE FROM product_promotion WHERE productVariantId = ? AND promotionId = ?";
    const [result] = await db.execute(sql, [productVariantId, promotionId]);
    return result.affectedRows > 0;
  }
  catch (error) {
    console.error("Error deleting product promotion:", error);
    throw error;
  }
}

module.exports = {
  createProductPromotion,
  getAllProductPromotions,
  deleteProductPromotion,
};