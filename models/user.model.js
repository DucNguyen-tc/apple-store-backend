const db = require('../config/db');

// Tạo mới 1 user
async function createUser(user) {
    try {
    const { fullName, email, password, phone, role } = user;
    const [result] = await db.execute(
        'INSERT INTO user (fullName, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
        [fullName, email, password, phone, role]
    );
    return result.insertId;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Lấy tất cả users
async function getAllUsers() {
    try {
        const [rows] = await db.execute('SELECT * FROM user');
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// Lấy user theo id
async function getUserById(id) {
    try {
        const [rows] = await db.execute('SELECT * FROM user WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// Cập nhật user theo id
async function updateUser(id, user) {
    try {
        const { fullName, email, password, phone, role } = user;
        const [result] = await db.execute(
            'UPDATE user SET fullName = ?, email = ?, password = ?, phone = ?, role = ? WHERE id = ?',
            [fullName, email, password, phone, role, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// Xóa user theo id
async function deleteUser(id) {
    try {
        const [result] = await db.execute('DELETE FROM user WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}