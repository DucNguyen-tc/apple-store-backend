const db = require("../config/db");

//Tạo mới 1 product variant
async function createProductVariant(productVariant) {
  const {
    product_id,
    color,
    storage_capacity,
    stock_quantity,
    price,
    specification,
    name,
    size,
    warranty_period,
    isActive,
  } = productVariant;
  const [result] = await db.execute(
    "INSERT INTO product_variant (product_id, color, storage_capacity, stock_quantity, price, specification, name, size, warranty_period, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      product_id,
      color,
      storage_capacity,
      stock_quantity,
      price,
      specification,
      name,
      size,
      warranty_period,
      isActive
    ]
  );
  return result.insertId;
}

//Lấy tất cả product variants
// async function getAllProductVariants() {
//   const sql = `
//     SELECT pv.*, 
//        MAX(thumb.imageUrl) AS thumbnail_url, 
//        IFNULL(SUM(CASE 
//            WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price 
//            WHEN promo.type = 'flat_discount' THEN promo.discount_value 
//            ELSE 0 
//        END), 0) AS total_discount, 
//        ROUND(pv.price - IFNULL(SUM(CASE 
//            WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price 
//            WHEN promo.type = 'flat_discount' THEN promo.discount_value 
//            ELSE 0 
//        END), 0)) AS final_price 
//     FROM product_variant pv 
//     LEFT JOIN product_promotion pp ON pv.id = pp.productVariantId 
//     LEFT JOIN promotion promo ON promo.id = pp.promotionId 
//     LEFT JOIN product_variant_image thumb ON thumb.productVariantId = pv.id AND thumb.isThumbnail = TRUE 
//     GROUP BY pv.id 
//     LIMIT 0, 1000;
//       `;
//   const [rows] = await db.execute(sql);
//   return rows;
// }

async function getAllProductVariants() {
  const sql = `
    SELECT 
  pv.*, 
  MAX(thumb.imageUrl) AS thumbnail_url, 
  IFNULL(SUM(CASE 
      WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price 
      WHEN promo.type = 'flat_discount' THEN promo.discount_value 
      ELSE 0 
  END), 0) AS total_discount, 
  ROUND(pv.price - IFNULL(SUM(CASE 
      WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price 
      WHEN promo.type = 'flat_discount' THEN promo.discount_value 
      ELSE 0 
  END), 0)) AS final_price 
FROM product_variant pv
LEFT JOIN product_promotion pp ON pv.id = pp.productVariantId 
LEFT JOIN promotion promo 
  ON promo.id = pp.promotionId 
  AND promo.isActive = TRUE
  AND NOW() BETWEEN promo.start_date AND promo.end_date
LEFT JOIN product_variant_image thumb 
  ON thumb.productVariantId = pv.id AND thumb.isThumbnail = TRUE
GROUP BY pv.id 
LIMIT 0, 1000;
      `;
  const [rows] = await db.execute(sql);
  return rows;
}
// async function getAllProductVariants() {
//   const sql = `
//     SELECT
//       pv.*,
//       IFNULL(SUM(
//         CASE 
//             WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price
//             WHEN promo.type = 'flat_discount' THEN promo.discount_value
//             ELSE 0
//         END
//       ), 0) AS total_discount,
//       ROUND(pv.price - IFNULL(SUM(
//           CASE 
//             WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price
//             WHEN promo.type = 'flat_discount' THEN promo.discount_value
//             ELSE 0
//           END
//         ), 0)) AS final_price
//     FROM product_variant pv
//     LEFT JOIN product_promotion pp ON pv.id = pp.productVariantId
//     LEFT JOIN promotion promo ON promo.id = pp.promotionId
//     GROUP BY pv.id
//     LIMIT 0, 1000;
//   `;
//   const [rows] = await db.execute(sql);
//   return rows;
// }

//Lấy product variant theo id
async function getProductVariantById(id) {
  const sql = `
    SELECT pv.*, 
       MAX(thumb.imageUrl) AS thumbnail_url, 
       IFNULL(SUM(CASE 
           WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price 
           WHEN promo.type = 'flat_discount' THEN promo.discount_value 
           ELSE 0 
       END), 0) AS total_discount, 
       ROUND(pv.price - IFNULL(SUM(CASE 
           WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price 
           WHEN promo.type = 'flat_discount' THEN promo.discount_value 
           ELSE 0 
       END), 0)) AS final_price 
    FROM product_variant pv 
    LEFT JOIN product_promotion pp ON pv.id = pp.productVariantId 
    LEFT JOIN promotion promo 
  ON promo.id = pp.promotionId 
  AND promo.isActive = TRUE
  AND NOW() BETWEEN promo.start_date AND promo.end_date
    LEFT JOIN product_variant_image thumb ON thumb.productVariantId = pv.id AND thumb.isThumbnail = TRUE 
    WHERE pv.id = ?
    GROUP BY pv.id 
    LIMIT 0, 1000;
        `;
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
}

//Lấy product variant theo ProductID
async function getProductVariantByProductId(ProductId) {
  const sql = `
   SELECT pv.*, 
       MAX(thumb.imageUrl) AS thumbnail_url, 
       IFNULL(SUM(CASE 
           WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price 
           WHEN promo.type = 'flat_discount' THEN promo.discount_value 
           ELSE 0 
       END), 0) AS total_discount, 
       ROUND(pv.price - IFNULL(SUM(CASE 
           WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price 
           WHEN promo.type = 'flat_discount' THEN promo.discount_value 
           ELSE 0 
       END), 0)) AS final_price 
    FROM product_variant pv 
    LEFT JOIN product_promotion pp ON pv.id = pp.productVariantId 
    LEFT JOIN promotion promo 
  ON promo.id = pp.promotionId 
  AND promo.isActive = TRUE
  AND NOW() BETWEEN promo.start_date AND promo.end_date
    LEFT JOIN product_variant_image thumb ON thumb.productVariantId = pv.id AND thumb.isThumbnail = TRUE 
    WHERE pv.product_id = ?
    GROUP BY pv.id 
    LIMIT 0, 1000;
        `;
  const [rows] = await db.execute(sql, [ProductId]);
  return rows;
}

//Cập nhật product variant theo id
async function updateProductVariant(id, productVariant) {
  const {
    product_id,
    color,
    storage_capacity,
    stock_quantity,
    price,
    specification,
    name,
    size,
    warranty_period,
    isActive,
  } = productVariant;
  const [result] = await db.execute(
    "UPDATE product_variant SET product_id = ?, color = ?, storage_capacity = ?, specification = ?, stock_quantity = ?, price = ?, name = ?, size = ?, warranty_period = ?, isActive = ? WHERE id = ?",
    [
      product_id,
      color,
      storage_capacity,
      specification,
      stock_quantity,
      price,
      name,
      size,
      warranty_period,
      isActive,
      id
    ]
  );
  return result.affectedRows > 0;
}

//Xóa product variant theo id
async function deleteProductVariant(id) {
  const [result] = await db.execute(
    "DELETE FROM product_variant WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

async function findDuplicateVariant({ product_id, color, storage_capacity, size }) {
  const [rows] = await db.execute(
    `SELECT * FROM product_variant
     WHERE product_id = ? AND color = ? AND storage_capacity = ? AND size = ?
     LIMIT 1`,
    [product_id, color, storage_capacity, size]
  );
  return rows[0] || null;
}

module.exports = {
  createProductVariant,
  getAllProductVariants,
  getProductVariantById,
  updateProductVariant,
  deleteProductVariant,
  getProductVariantByProductId,
  findDuplicateVariant,
};
