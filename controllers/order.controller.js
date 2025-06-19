const {
  createOrder,
  getAllOrders,
  getOrderById,
  createOrderFromCart,
  getOrderByUserId,
  updateOrderStatus,
} = require("../models/order.model");

// Tạo đơn hàng  (tạm bỏ )
async function createOrderController(req, res) {
  try {
    const order = req.body;
    const orderId = await createOrder(order);
    res.status(201).json({ id: orderId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
}

// Lấy danh sách tất cả đơn hàng
async function getAllOrdersController(req, res) {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}

// Lấy thông tin chi tiết đơn hàng theo ID
async function getOrderByIdController(req, res) {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
}

// Đặt hàng từ giỏ hàng
async function createOrderFromCartController(req, res) {
  try {
    const user_id = req.body.user_id;
    const order_id = await createOrderFromCart(user_id);
    res.status(201).json({ message: "Đặt hàng thành công!", order_id });
  } catch (error) {
    res.status(400).json({ message: error.message || "Lỗi đặt hàng!" });
  }
}

// Lấy đơn hàng theo user_id
async function getOrderByUserIdController(req, res) {
  try {
    const user_id = req.params.user_id;
    const orders = await getOrderByUserId(user_id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}

// Cập nhật trạng thái đơn hàng
async function updateOrderStatusController(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await updateOrderStatus(id, status);
    res.status(200).json({ message: "Cập nhật trạng thái đơn hàng thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
}

module.exports = {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  createOrderFromCartController,
  getOrderByUserIdController,
  updateOrderStatusController,
};
