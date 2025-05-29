const db = require("../config/db");

// Tạo mới 1 product
async function createProduct(product) {
  const { Name, ProductCategory_Id, description } = product;
  const [result] = await db.execute(
    "INSERT INTO product (Name, ProductCategory_Id, description) VALUES (?, ?, ?)",
    [Name, ProductCategory_Id, description]
  );
  return result.insertId;
}

// Lấy tất cả products
async function getAllProducts() {
  const [rows] = await db.execute("SELECT * FROM product");
  return rows;
}

// Lấy product theo id
async function getProductById(id) {
  const [rows] = await db.execute("SELECT * FROM product WHERE id = ?", [id]);
  return rows[0];
}

//Lấy product theo name
async function getProductByName(name) {
  const [rows] = await db.execute("SELECT * FROM product WHERE Name = ?", [name]);
  return rows[0];
}

// Cập nhật product theo id
async function updateProduct(id, product) {
  const { Name, ProductCategory_Id, description, isActive } = product;
  const [result] = await db.execute(
    "UPDATE product SET Name = ?, ProductCategory_Id = ?, description = ?, isActive = ? WHERE id = ?",
    [Name, ProductCategory_Id, description, isActive, id]
  );
  return result.affectedRows > 0;
}

// Xóa product theo id
async function deleteProduct(id) {
  const [result] = await db.execute("DELETE FROM product WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByName,
};
