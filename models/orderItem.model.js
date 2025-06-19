const db = require("../config/db");

// Thêm sản phẩm vao đơn hàng
async function createOrderItem(orderItem) {
  try {
    const { order_id, product_variant_id, quantity, price_at_purchase } =
      orderItem;
    const [result] = await db.execute(
      "INSERT INTO order_items (order_id, product_variant_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)",
      [order_id, product_variant_id, quantity, price_at_purchase]
    );
    return result.insertId; // Return the ID of the newly created order item
  } catch (error) {
    console.error("Error creating order item:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

// Lấy sản phẩm trong đơn hàng theo orderID
async function getOrderItemsByOrderId(orderId) {
  try {
    const [rows] = await db.execute(
    `SELECT pv.name as variant_name, oi.*
    FROM order_items as oi
    JOIN product_variant as pv on pv.id = oi.product_variant_id
    WHERE order_id = ?`,
      [orderId]
    );
    return rows; // Return the list of order items
  } catch (error) {
    console.error("Error fetching order items:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

// Lấy sản phẩm trong đơn hàng theo user_id
async function getOrderItemsByUserId(user_id, order_id) {
  try {
    const [rows] = await db.execute(`
      SELECT oi.*,o.total_amount, pv.name as variant_name, pv.color, pv.storage_capacity
      FROM order_items as oi
      JOIN product_variant as pv on pv.id = oi.product_variant_id
      JOIN orders as o on o.id = oi.order_id
      WHERE o.user_id = ? AND oi.order_id = ?
    `, [user_id, order_id]);
    return rows;
  } catch (error) {
    console.error("Error fetching order items:", error);
    throw error;
  }
};
module.exports = {
  createOrderItem,
  getOrderItemsByOrderId,
  getOrderItemsByUserId,
};
