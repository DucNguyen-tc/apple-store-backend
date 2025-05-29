const db = require("../config/db");

// Tạo mới 1 promotion
async function createPromotion(promotion) {
  const { name, discount_value, start_date, end_date, description, type } =
    promotion;
  const [result] = await db.execute(
    "INSERT INTO promotion (name, discount_value, start_date, end_date, description, type) VALUES (?, ?, ?, ?, ?, ?)",
    [name, discount_value, start_date, end_date, description, type]
  );
  return result.insertId;
}

// Lấy tất cả promotions
async function getAllPromotions() {
  const [rows] = await db.execute("SELECT * FROM promotion");
  return rows;
}

// Lấy promotion theo id
async function getPromotionById(id) {
  const [rows] = await db.execute("SELECT * FROM promotion WHERE id = ?", [id]);
  return rows[0];
}

// Cập nhật promotion theo id
async function updatePromotion(id, promotion) {
  const {
    name,
    discount_value,
    start_date,
    end_date,
    isActive,
    description,
    type,
  } = promotion;
  const [result] = await db.execute(
    "UPDATE promotion SET name = ?, discount_value = ?, start_date = ?, end_date = ?, isActive = ?, description = ?, type = ? WHERE id = ?",
    [
      name,
      discount_value,
      start_date,
      end_date,
      isActive,
      description,
      type,
      id,
    ]
  );
  return result.affectedRows > 0;
}

// Xóa promotion theo id
async function deletePromotion(id) {
  const [result] = await db.execute("DELETE FROM promotion WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
};
