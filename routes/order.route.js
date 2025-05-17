const express = require("express");
const {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
} = require("../controllers/order.controller");

const router = express.Router();

// Tạo đơn hàng
router.post("/", createOrderController);

// Lấy danh sách tất cả đơn hàng
router.get("/", getAllOrdersController);

// Lấy thông tin chi tiết đơn hàng theo ID
router.get("/:id", getOrderByIdController);

module.exports = router;
