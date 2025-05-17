const {
  createOrder,
  getAllOrders,
  getOrderById,
} = require("../models/order.model");

// Tạo đơn hàng
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

module.exports = {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
};
