const db = require('../config/db');


//Tạo mới 1 product category
async function createProductCategory(ProductCategory) {
    try {
        const { name, description } = ProductCategory;
        const [result] = await db.execute(
            'INSERT INTO product_category (name, description) VALUES (?, ?)',
            [name, description]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating product category:', error);
        throw error;
    }
}

//Lấy tất cả product category
async function getAllProductCategories() {
    try {
        const [rows] = await db.execute('SELECT * FROM product_category');
        return rows;
    } catch (error) {
        console.error('Error fetching product categories:', error);
        throw error;
    }
}

//Lấy product category theo id
async function getProductCategoryById(id) {
    try {
        const [rows] = await db.execute('SELECT * FROM product_category WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching product category:', error);
        throw error;
    }
}

//Cập nhật product category theo id
async function updateProductCategory(id, ProductCategory) {
    try {
        const { name, description } = ProductCategory;
        const [result] = await db.execute(
            'UPDATE product_category SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating product category:', error);
        throw error;
    }
}

//Xóa product category theo id
async function deleteProductCategory(id) {
    try {
        const [result] = await db.execute('DELETE FROM product_category WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting product category:', error);
        throw error;
    }
}

module.exports = {
    createProductCategory,
    getAllProductCategories,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory,
}