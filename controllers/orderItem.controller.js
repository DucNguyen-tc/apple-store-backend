const {
  createOrderItem,
  getOrderItemsByOrderId,
} = require("../models/orderItem.model");

// Thêm sản phẩm vào đơn hàng
async function createOrderItemController(req, res) {
  try {
    const orderItem = req.body;
    const orderItemId = await createOrderItem(orderItem);
    res.status(201).json({ id: orderItemId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order item" });
  }
}

// Lấy sản phẩm trong đơn hàng theo orderID
async function getOrderItemsByOrderIdController(req, res) {
  try {
    const { orderId } = req.params;
    const orderItems = await getOrderItemsByOrderId(orderId);
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order items" });
  }
}

module.exports = {
  createOrderItemController,
  getOrderItemsByOrderIdController,
};
