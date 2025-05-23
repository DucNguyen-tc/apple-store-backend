const db = require('../config/db');

// Tạo cửa hàng mới
async function createStore(store) {
    try {
        const { name, address, phone, opening_hours, city } = store;
        const [result] = await db.execute(
            'INSERT INTO stores (name, address, phone, opening_hours, city) VALUES (?, ?, ?, ?, ?)',
            [name, address, phone, opening_hours, city]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating store:', error);
        throw error;
    }
}

// Lấy tất cả cửa hàng
async function getAllStores() {
    try {
        const [rows] = await db.execute('SELECT * FROM stores');
        return rows;
    } catch (error) {
        console.error('Error fetching stores:', error);
        throw error;
    }
}

// Lấy cửa hàng theo id
async function getStoreById(id) {
    try {
        const [rows] = await db.execute('SELECT * FROM stores WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching store:', error);
        throw error;
    }
}

// Cập nhật cửa hàng
async function updateStore(id, store) {
    try {
        const { name, address, phone, opening_hours, city } = store;
        const [result] = await db.execute(
            'UPDATE stores SET name = ?, address = ?, phone = ?, opening_hours = ?, city = ? WHERE id = ?',
            [name, address, phone, opening_hours, city, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating store:', error);
        throw error;
    }
}

// Xóa cửa hàng
async function deleteStore(id) {
    try {
        const [result] = await db.execute('DELETE FROM stores WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting store:', error);
        throw error;
    }
}

module.exports = {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore
}; 