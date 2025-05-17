const CartItem = require("../models/cartItem.model");

// Tạo mới một cart item
exports.createCartItem = async (req, res, next) => {
  try {
    const id = await CartItem.createCartItem(req.body);
    res.status(201).json({
      message: "Cart item created successfully",
      id: id,
    });
  } catch (error) {
    console.error("Error creating cart item:", error);
    next(error);
  }
};

// Lấy giỏ hàng theo user_id
exports.getCartByUserId = async (req, res, next) => {
  try {
    const cartItems = await CartItem.getCartByUserId(req.params.user_id);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart by user ID:", error);
    next(error);
  }
};

// Xóa cart item theo id
exports.deleteCartItem = async (req, res, next) => {
  try {
    const success = await CartItem.deleteCartItem(req.params.id);
    if (success) {
      res.status(200).json({ message: "Cart item deleted successfully" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    console.error("Error deleting cart item:", error);
    next(error);
  }
};
