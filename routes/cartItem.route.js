const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cartItem.controller");
const verifyToken = require("../middleware/verifyToken");
// Thêm sản phẩm vào giỏ hàng
router.post("/", verifyToken, cartItemController.addToCart);

// Lấy giỏ hàng của user
router.get("/user/:user_id", verifyToken, cartItemController.getCartByUser);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/:id", verifyToken, cartItemController.updateCartItem);

// Xóa một sản phẩm khỏi giỏ hàng
router.delete("/:id", verifyToken, cartItemController.deleteCartItem);

// Xóa toàn bộ giỏ hàng của user (dùng khi đặt hàng)
router.delete(
  "/user/:user_id",
  verifyToken,
  cartItemController.deleteAllCartItemsByUser
);

module.exports = router;
