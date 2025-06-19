const express = require("express");
const {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  createOrderFromCartController,
  getOrderByUserIdController,
  updateOrderStatusController,
} = require("../controllers/order.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// Tạo đơn hàng
router.post("/", verifyToken, createOrderController);

// Lấy danh sách tất cả đơn hàng
router.get("/", verifyToken, getAllOrdersController);

// Lấy thông tin chi tiết đơn hàng theo ID
router.get("/:id", verifyToken, getOrderByIdController);

// Tạo đơn hàng từ giỏ hàng
router.post("/from-cart", verifyToken, createOrderFromCartController);

// Lấy đơn hàng theo user_id
router.get("/user/:user_id", verifyToken, getOrderByUserIdController );

// Cập nhật trạng thái đơn hàng
router.put("/:id", verifyToken, updateOrderStatusController);

module.exports = router;
