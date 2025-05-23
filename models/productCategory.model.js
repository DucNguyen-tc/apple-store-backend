const db = require("../config/db");

//Tạo mới 1 product category
async function createProductCategory(ProductCategory) {
  const { name, description } = ProductCategory;
  const [result] = await db.execute(
    "INSERT INTO product_category (name, description) VALUES (?, ?)",
    [name, description]
  );
  return result.insertId;
}

//Lấy tất cả product category
async function getAllProductCategories() {
  const [rows] = await db.execute("SELECT * FROM product_category");
  return rows;
}

//Lấy product category theo id
async function getProductCategoryById(id) {
  const [rows] = await db.execute(
    "SELECT * FROM product_category WHERE id = ?",
    [id]
  );
  return rows[0];
}

//Cập nhật product category theo id
async function updateProductCategory(id, ProductCategory) {
  const { name, description } = ProductCategory;
  const [result] = await db.execute(
    "UPDATE product_category SET name = ?, description = ? WHERE id = ?",
    [name, description, id]
  );
  return result.affectedRows > 0;
}

//Xóa product category theo id
async function deleteProductCategory(id) {
  const [result] = await db.execute(
    "DELETE FROM product_category WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};
