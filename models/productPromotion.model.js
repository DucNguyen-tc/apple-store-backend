const db = require("../config/db");

//Tạo mới 1 product promotion
async function createProductPromotion({ productVariantId, promotionId }) {
  const sql =
    "INSERT INTO product_promotion (productVariantId, promotionId) VALUES (?, ?)";
  const [result] = await db.execute(sql, [productVariantId, promotionId]);
  return result.affectedRows > 0;
}

//Lấy tất cả product promotions
async function getAllProductPromotionsWithName() {
  const sql = `
      SELECT pp.*, pv.color, pv.storage_capacity, promo.name AS promotion_name
      FROM product_promotion pp
      JOIN product_variant pv ON pv.id = pp.productVariantId
      JOIN promotion promo ON promo.id = pp.promotionId
    `;
  const [rows] = await db.execute(sql);
  return rows;
}

async function getAllProductPromotions() {
  const sql = `
      SELECT * FROM product_promotion
    `;
  const [rows] = await db.execute(sql);
  return rows;
}

//Xoá product promotion
async function deleteProductPromotion({ productVariantId, promotionId }) {
  const sql =
    "DELETE FROM product_promotion WHERE productVariantId = ? AND promotionId = ?";
  const [result] = await db.execute(sql, [productVariantId, promotionId]);
  return result.affectedRows > 0;
}

module.exports = {
  createProductPromotion,
  getAllProductPromotions,
  deleteProductPromotion,
};
