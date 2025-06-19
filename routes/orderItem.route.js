const express = require("express");
const {
  createOrderItemController,
  getOrderItemsByOrderIdController,
  getOrderItemsByUserIdController,
} = require("../controllers/orderItem.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// Thêm sản phẩm vào đơn hàng
router.post("/", createOrderItemController);

// Lấy sản phẩm trong đơn hàng theo orderID
router.get("/:orderId", getOrderItemsByOrderIdController);
// Lấy sản phẩm trong đơn hàng theo user_id
router.get("/user/:user_id/:order_id", verifyToken, getOrderItemsByUserIdController);

module.exports = router;
