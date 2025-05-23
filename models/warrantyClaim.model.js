const db = require('../config/db');

// Tạo yêu cầu bảo hành mới
async function createWarrantyClaim(claim) {
    try {
        const { 
            user_id, 
            product_id, 
            serial_number, 
            purchase_date, 
            claim_date, 
            issue_description, 
            status, 
            return_date, 
            store_id 
        } = claim;

        const [result] = await db.execute(
            `INSERT INTO warranty_claims 
            (user_id, product_id, serial_number, purchase_date, claim_date, 
            issue_description, status, return_date, store_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, product_id, serial_number, purchase_date, claim_date, 
            issue_description, status, return_date, store_id]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating warranty claim:', error);
        throw error;
    }
}

// Lấy tất cả yêu cầu bảo hành
async function getAllWarrantyClaims() {
    try {
        const [rows] = await db.execute('SELECT * FROM warranty_claims');
        return rows;
    } catch (error) {
        console.error('Error fetching warranty claims:', error);
        throw error;
    }
}

// Lấy yêu cầu bảo hành theo id
async function getWarrantyClaimById(id) {
    try {
        const [rows] = await db.execute('SELECT * FROM warranty_claims WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching warranty claim:', error);
        throw error;
    }
}

// Cập nhật yêu cầu bảo hành
async function updateWarrantyClaim(id, claim) {
    try {
        const { 
            user_id, 
            product_id, 
            serial_number, 
            purchase_date, 
            claim_date, 
            issue_description, 
            status, 
            return_date, 
            store_id 
        } = claim;

        const [result] = await db.execute(
            `UPDATE warranty_claims 
            SET user_id = ?, product_id = ?, serial_number = ?, 
            purchase_date = ?, claim_date = ?, issue_description = ?, 
            status = ?, return_date = ?, store_id = ? 
            WHERE id = ?`,
            [user_id, product_id, serial_number, purchase_date, claim_date, 
            issue_description, status, return_date, store_id, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating warranty claim:', error);
        throw error;
    }
}

// Xóa yêu cầu bảo hành
async function deleteWarrantyClaim(id) {
    try {
        const [result] = await db.execute('DELETE FROM warranty_claims WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting warranty claim:', error);
        throw error;
    }
}

// Lấy yêu cầu bảo hành theo user_id
async function getWarrantyClaimsByUserId(userId) {
    try {
        const [rows] = await db.execute('SELECT * FROM warranty_claims WHERE user_id = ?', [userId]);
        return rows;
    } catch (error) {
        console.error('Error fetching warranty claims by user:', error);
        throw error;
    }
}

// Lấy yêu cầu bảo hành theo product_id
async function getWarrantyClaimsByProductId(productId) {
    try {
        const [rows] = await db.execute('SELECT * FROM warranty_claims WHERE product_id = ?', [productId]);
        return rows;
    } catch (error) {
        console.error('Error fetching warranty claims by product:', error);
        throw error;
    }
}

module.exports = {
    createWarrantyClaim,
    getAllWarrantyClaims,
    getWarrantyClaimById,
    updateWarrantyClaim,
    deleteWarrantyClaim,
    getWarrantyClaimsByUserId,
    getWarrantyClaimsByProductId
}; 