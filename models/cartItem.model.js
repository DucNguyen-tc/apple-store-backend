const db = require("../config/db");

// Thêm hoặc tăng số lượng cart item
async function createOrUpdateCartItem(cartItem) {
  const { user_id, product_variant_id, quantity } = cartItem;
  // Kiểm tra đã có sản phẩm này trong giỏ chưa
  const [rows] = await db.execute(
    "SELECT * FROM cart_item WHERE user_id = ? AND product_variant_id = ?",
    [user_id, product_variant_id]
  );
  if (rows.length > 0) {
    // Nếu đã có, tăng số lượng
    await db.execute(
      "UPDATE cart_item SET quantity = quantity + ? WHERE user_id = ? AND product_variant_id = ?",
      [quantity, user_id, product_variant_id]
    );
    return rows[0].id;
  } else {
    // Nếu chưa có, thêm mới
    const [result] = await db.execute(
      "INSERT INTO cart_item (user_id, product_variant_id, quantity) VALUES (?, ?, ?)",
      [user_id, product_variant_id, quantity]
    );
    return result.insertId;
  }
}

// Lấy giỏ hàng theo user_id
async function getCartByUserId(user_id) {
  const [rows] = await db.execute(
    `SELECT 
    ci.*, 
    pv.price, 
    MAX(pvi.imageUrl) AS imageUrl, 
    MAX(pv.name) AS variant_name,

    ROUND(IFNULL(SUM(CASE 
    WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price
    WHEN promo.type = 'flat_discount' THEN promo.discount_value
    ELSE 0
	END), 0)) AS total_discount,

    ROUND(pv.price - IFNULL(SUM(CASE 
        WHEN promo.type = 'percentage' THEN promo.discount_value / 100 * pv.price
        WHEN promo.type = 'flat_discount' THEN promo.discount_value
        ELSE 0
    END), 0)) AS final_price

FROM cart_item ci
JOIN product_variant pv ON ci.product_variant_id = pv.id
JOIN product_variant_image pvi ON pv.id = pvi.productVariantId AND pvi.isThumbnail = TRUE
LEFT JOIN product_promotion pp ON pv.id = pp.productVariantId
LEFT JOIN promotion promo ON promo.id = pp.promotionId
    AND promo.isActive = TRUE
    AND NOW() BETWEEN promo.start_date AND promo.end_date

WHERE ci.user_id = ?
GROUP BY ci.id
LIMIT 0, 1000;`,
    [user_id]
  );
  return rows;
}

// Cập nhật số lượng cart item theo id
async function updateCartItemQuantity(id, quantity) {
  const [result] = await db.execute(
    "UPDATE cart_item SET quantity = ? WHERE id = ?",
    [quantity, id]
  );
  return result.affectedRows > 0;
}

// Xóa cart item theo id
async function deleteCartItem(id) {
  const [result] = await db.execute("DELETE FROM cart_item WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

// Xóa toàn bộ cart item của user
async function deleteAllCartItemsByUser(user_id) {
  const [result] = await db.execute("DELETE FROM cart_item WHERE user_id = ?", [
    user_id,
  ]);
  return result.affectedRows > 0;
}

module.exports = {
  createOrUpdateCartItem,
  getCartByUserId,
  updateCartItemQuantity,
  deleteCartItem,
  deleteAllCartItemsByUser,
};
