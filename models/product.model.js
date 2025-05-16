const db = require("../config/db");

// Tạo mới 1 product
async function createProduct(product) {
  try {
    const { name, ProductCategory_Id, ReviewArticle} = product;
    const [result] = await db.execute(
      "INSERT INTO product (name, ProductCategory_Id, ReviewArticle) VALUES (?, ?, ?)",
      [name, ProductCategory_Id, ReviewArticle]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// Lấy tất cả products
async function getAllProducts() {
  try {
    const [rows] = await db.execute("SELECT * FROM product");
    return rows;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Lấy product theo id
async function getProductById(id) {
  try {
    const [rows] = await db.execute("SELECT * FROM product WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// Cập nhật product theo id
async function updateProduct(id, product) {
  try {
    const { name, ProductCategory_Id, ReviewArticle, isActive } = product;
    const [result] = await db.execute(
      "UPDATE product SET name = ?, ProductCategory_Id = ?, ReviewArticle = ?, isActive = ? WHERE id = ?",
      [name, ProductCategory_Id, ReviewArticle, isActive, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Xóa product theo id
async function deleteProduct(id) {
  try {
    const [result] = await db.execute("DELETE FROM product WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
