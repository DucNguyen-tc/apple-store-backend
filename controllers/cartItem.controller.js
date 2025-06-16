const CartItem = require("../models/cartItem.model");

// // Tạo mới một cart item
// exports.createCartItem = async (req, res, next) => {
//   try {
//     const id = await CartItem.createCartItem(req.body);
//     res.status(201).json({
//       message: "Cart item created successfully",
//       id: id,
//     });
//   } catch (error) {
//     console.error("Error creating cart item:", error);
//     next(error);
//   }
// };

// // Lấy giỏ hàng theo user_id
// exports.getCartByUserId = async (req, res, next) => {
//   try {
//     const cartItems = await CartItem.getCartByUserId(req.params.user_id);
//     res.status(200).json(cartItems);
//   } catch (error) {
//     console.error("Error fetching cart by user ID:", error);
//     next(error);
//   }
// };

// Thêm hoặc tăng số lượng cart item
exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_variant_id, quantity } = req.body;
    if (!user_id || !product_variant_id || !quantity) {
      return res.status(400).json({ message: "Thiếu thông tin!" });
    }
    const id = await CartItem.createOrUpdateCartItem({
      user_id,
      product_variant_id,
      quantity,
    });
    res.json({ message: "Đã thêm vào giỏ hàng", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi thêm vào giỏ hàng!" });
  }
};

// Lấy giỏ hàng của user
exports.getCartByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const cart = await CartItem.getCartByUserId(user_id);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi lấy giỏ hàng!" });
  }
};

// Cập nhật số lượng cart item
exports.updateCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;
    const ok = await CartItem.updateCartItemQuantity(id, quantity);
    if (ok) {
      res.json({ message: "Đã cập nhật số lượng!" });
    } else {
      res.status(404).json({ message: "Không tìm thấy cart item!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi cập nhật giỏ hàng!" });
  }
};

// Xóa cart item theo id
exports.deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const ok = await CartItem.deleteCartItem(id);
    if (ok) {
      res.json({ message: "Đã xóa sản phẩm khỏi giỏ hàng!" });
    } else {
      res.status(404).json({ message: "Không tìm thấy cart item!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi xóa giỏ hàng!" });
  }
};

// Xóa toàn bộ cart item của user (dùng khi đặt hàng)
exports.deleteAllCartItemsByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    await CartItem.deleteAllCartItemsByUser(user_id);
    res.json({ message: "Đã xóa toàn bộ giỏ hàng!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi xóa toàn bộ giỏ hàng!" });
  }
};
