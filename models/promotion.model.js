const db = require('../config/db');

// Tạo mới 1 promotion
async function createPromotion(promotion) {
    try {
        const { name, discount_value, start_date, end_date, description, type} = promotion;
        const [result] = await db.execute(
            "INSERT INTO promotion (name, discount_value, start_date, end_date, description, type) VALUES (?, ?, ?, ?, ?, ?)",
            [name, discount_value, start_date, end_date, description, type]
        );
        return result.insertId;
    }
    catch (error) {
        console.error("Error creating promotion:", error);
        throw error;
    }
}

// Lấy tất cả promotions
async function getAllPromotions() {
    try {
        const [rows] = await db.execute("SELECT * FROM promotion");
        return rows;
    }
    catch (error) {
        console.error("Error fetching promotions:", error);
        throw error;
    }
}

// Lấy promotion theo id
async function getPromotionById(id) {
    try {
        const [rows] = await db.execute("SELECT * FROM promotion WHERE id = ?", [id]);
        return rows[0];
    }
    catch (error) {
        console.error("Error fetching promotion:", error);
        throw error;
    }
}

// Cập nhật promotion theo id
async function updatePromotion(id, promotion) {
    try {
        const { name, discount_value, start_date, end_date, isActive, description, type } = promotion;
        const [result] = await db.execute(
            "UPDATE promotion SET name = ?, discount_value = ?, start_date = ?, end_date = ?, isActive = ?, description = ?, type = ? WHERE id = ?",
            [name, discount_value, start_date, end_date, isActive, description, type, id]
        );
        return result.affectedRows > 0;
    }
    catch (error) {
        console.error("Error updating promotion:", error);
        throw error;
    }
}

// Xóa promotion theo id
async function deletePromotion(id) {
    try {
        const [result] = await db.execute("DELETE FROM promotion WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
    catch (error) {
        console.error("Error deleting promotion:", error);
        throw error;
    }
}

module.exports = {
    createPromotion,
    getAllPromotions,
    getPromotionById,
    updatePromotion,
    deletePromotion,
};
