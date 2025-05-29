const db = require("../config/db");

// Tạo cửa hàng mới
async function createStore(store) {
  const { name, address, phone, opening_hours, city } = store;
  const [result] = await db.execute(
    "INSERT INTO stores (name, address, phone, opening_hours, city) VALUES (?, ?, ?, ?, ?)",
    [name, address, phone, opening_hours, city]
  );
  return result.insertId;
}

// Lấy tất cả cửa hàng
async function getAllStores() {
  const [rows] = await db.execute("SELECT * FROM stores");
  return rows;
}

// Lấy cửa hàng theo id
async function getStoreById(id) {
  const [rows] = await db.execute("SELECT * FROM stores WHERE id = ?", [id]);
  return rows[0];
}

// Cập nhật cửa hàng
async function updateStore(id, store) {
  const { name, address, phone, opening_hours, city } = store;
  const [result] = await db.execute(
    "UPDATE stores SET name = ?, address = ?, phone = ?, opening_hours = ?, city = ? WHERE id = ?",
    [name, address, phone, opening_hours, city, id]
  );
  return result.affectedRows > 0;
}

// Xóa cửa hàng
async function deleteStore(id) {
  const [result] = await db.execute("DELETE FROM stores WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
};
