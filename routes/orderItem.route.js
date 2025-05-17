const express = require("express");
const {
  createOrderItemController,
  getOrderItemsByOrderIdController,
} = require("../controllers/orderItem.controller");

const router = express.Router();

// Thêm sản phẩm vào đơn hàng
router.post("/", createOrderItemController);

// Lấy sản phẩm trong đơn hàng theo orderID
router.get("/:orderId", getOrderItemsByOrderIdController);

module.exports = router;
