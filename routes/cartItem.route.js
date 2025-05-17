const express = require("express");
const router = express.Router();
const CartItemController = require("../controllers/cartItem.controller");

// Tạo mới một cart item
router.post("/", CartItemController.createCartItem);

// Lấy giỏ hàng theo user_id
router.get("/user/:user_id", CartItemController.getCartByUserId);

// Xóa cart item theo id
router.delete("/:id", CartItemController.deleteCartItem);

module.exports = router;
