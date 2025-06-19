const db = require("../config/db");
const cartItemModel = require("../models/cartItem.model"); //khoa

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

// Tạo đơn hàng từ cart ( khoa )
async function createOrderFromCart(user_id) {
  try {
    // Lấy giỏ hàng của user
    const cartItems = await cartItemModel.getCartByUserId(user_id);
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Giỏ hàng trống!");
    }

    // Tính tổng tiền
    let total_amount = 0;
    for (const item of cartItems) {
      total_amount += item.quantity * item.final_price; // Sử dụng giá cuối cùng đã tính toán
    }

    // Giá trị mặc định cho các trường bắt buộc
    const shipping_address = "Chưa cập nhật";
    const payment_method = "COD";

    // Tạo đơn hàng mới
    const [result] = await db.execute(
      "INSERT INTO orders (user_id, status, total_amount, shipping_address, payment_method) VALUES (?, ?, ?, ?, ?)",
      [user_id, "pending", total_amount, shipping_address, payment_method]
    );
    const order_id = result.insertId;

    // Thêm các sản phẩm vào order_items
    for (const item of cartItems) {
      await db.execute(
        "INSERT INTO order_items (order_id, product_variant_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)",
        [order_id, item.product_variant_id, item.quantity, item.final_price]
      );
    }

    // Xóa giỏ hàng sau khi đặt hàng thành công
    await cartItemModel.deleteAllCartItemsByUser(user_id);

    return order_id;
  } catch (error) {
    console.error("Error creating order from cart:", error);
    throw error;
  }
}

// Lấy đơn hàng theo user_id
async function getOrderByUserId(user_id) {
  try {
    const [rows] = await db.execute("SELECT * FROM orders WHERE user_id = ?", [user_id]);
    return rows;
  } catch (error) {
    console.error("Error fetching order by user_id:", error);
    throw error;
  }
}

// Cập nhật trạng thái đơn hàng
async function updateOrderStatus(order_id, status) {
  try {
    await db.execute("UPDATE orders SET status = ? WHERE id = ?", [status, order_id]);
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  createOrderFromCart,
  getOrderByUserId,
  updateOrderStatus,
};
