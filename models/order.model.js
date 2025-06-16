const db = require("../config/db");

// Tạo đơn hàng
async function createOrder(order) {
  try {
    const { user_id, status, total_amount, shipping_address, payment_method } =
      order;
    const [result] = await db.execute(
      "INSERT INTO orders (user_id, status, total_amount, shipping_address, payment_method) VALUES (?, ?, ?, ?, ?)",
      [user_id, status, total_amount, shipping_address, payment_method]
    );
    return result.insertId; // Return the ID of the newly created order
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

// Lấy danh sách tất cả đơn hàng
async function getAllOrders() {
  try {
    const [rows] = await db.execute(`
    SELECT 
	    u.fullName AS user_name,
        u.phone as phone_number,
	    o.*
    FROM 
	    orders o
    JOIN 
	    user u ON o.user_id = u.id
    ORDER BY 
	    o.order_date DESC;`);
    return rows; // Return the list of orders
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

// Lấy thông tin chi tiết đơn hàng theo ID
async function getOrderById(orderId) {
  try {
    const [rows] = await db.execute("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ]);
    return rows[0]; // Return the order details
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
};
