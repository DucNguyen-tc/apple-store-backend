const db = require("../config/db");

//Tạo mới 1 product variant
async function createProductVariant(productVariant) {
  try {
    const {
      product_id,
      color,
      storage_capacity,
      stock_quantity,
      price,
      specification,
    } = productVariant;
    const [result] = await db.execute(
      "INSERT INTO product_variant (product_id, color, storage_capacity, stock_quantity, price, specification) VALUES (?, ?, ?, ?, ?, ?)",
      [
        product_id,
        color,
        storage_capacity,
        stock_quantity,
        price,
        specification,
      ]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating product variant:", error);
    throw error;
  }
}

//Lấy tất cả product variants
async function getAllProductVariants() {
  try {
    const sql = `
    SELECT 
      pv.*, 
      IFNULL(SUM(promo.discount_percent), 0) AS total_discount,
      ROUND(pv.price * (1 - IFNULL(SUM(promo.discount_percent), 0) / 100)) AS final_price
    FROM PRODUCT_VARIANT pv
    LEFT JOIN PRODUCT_PROMOTION pp ON pv.id = pp.productVariantId
    LEFT JOIN PROMOTION promo ON promo.id = pp.promotionId
    GROUP BY pv.id
  `;
    const [rows] = await db.execute(sql);
    return rows;
  } catch (error) {
    console.error("Error fetching all product variants:", error);
    throw error;
  }
}

//Lấy product variant theo id
async function getProductVariantById(id) {
  try {
    const sql = `
          SELECT 
            pv.*, 
            promo.discount_percentage,
            ROUND(pv.price * (1 - IFNULL(promo.discount_percent, 0) / 100)) AS final_price
          FROM PRODUCT_VARIANT pv
          LEFT JOIN PRODUCT_PROMOTION pp ON pv.id = pp.product__variant_id
          LEFT JOIN PROMOTION promo ON promo.id = pp.promotion_id
          WHERE pv.id = ?
        `;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching product variant by ID:", error);
    throw error;
  }
}

//Cập nhật product variant theo id
async function updateProductVariant(id, productVariant) {
  try {
    const {
      product_id,
      color,
      storage_capacity,
      stock_quantity,
      price,
      specification,
    } = productVariant;
    const [result] = await db.execute(
      "UPDATE product_variant SET product_id = ?, color = ?, storage_capacity = ?, specification = ?, stock_quantity = ?, price = ? WHERE id = ?",
      [
        product_id,
        color,
        storage_capacity,
        specification,
        stock_quantity,
        price,
        id,
      ]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating product variant:", error);
    throw error;
  }
}

//Xóa product variant theo id
async function deleteProductVariant(id) {
  try {
    const [result] = await db.execute(
      "DELETE FROM product_variant WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting product variant:", error);
    throw error;
  }
}

module.exports = {
  createProductVariant,
  getAllProductVariants,
  getProductVariantById,
  updateProductVariant,
  deleteProductVariant,
};
