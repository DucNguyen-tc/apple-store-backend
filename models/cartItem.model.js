const db = require('../config/db');

//Tạo mới 1 cart item
async function createCartItem(cartItem) {
    try {
        const { user_id, product_variant_id, quantity } = cartItem;
        const [result] = await db.execute(
            'INSERT INTO cart_items (user_id, product_variant_id, quantity) VALUES (?, ?, ?)',
            [user_id, product_variant_id, quantity])
         return result.insertId;   
    } catch (error) {
        console.error('Error creating cart item:', error);
        throw error;       
    }
}

//Lấy giỏ hàng theo user_id
async function getCartByUserId(user_id) {
  const [rows] = await db.execute(
    `SELECT * FROM cart_items WHERE user_id = ?`,
    [user_id]
  );
  return rows;
}


//Xóa cart item theo id
async function deleteCartItem(id) {
    try {
        const [result] = await db.execute('DELETE FROM cart_items WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw error;
    }
}

module.exports = {
    createCartItem,
    getCartByUserId,
    deleteCartItem
};