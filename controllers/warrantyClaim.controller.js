const warrantyClaimModel = require('../models/warrantyClaim.model');

// Tạo yêu cầu bảo hành mới
async function createWarrantyClaim(req, res) {
    try {
        const claim = req.body;
        const id = await warrantyClaimModel.createWarrantyClaim(claim);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Lấy tất cả yêu cầu bảo hành
async function getAllWarrantyClaims(req, res) {
    try {
        const claims = await warrantyClaimModel.getAllWarrantyClaims();
        res.json(claims);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Lấy yêu cầu bảo hành theo id
async function getWarrantyClaimById(req, res) {
    try {
        const { id } = req.params;
        const claim = await warrantyClaimModel.getWarrantyClaimById(id);
        if (!claim) {
            return res.status(404).json({ error: 'Warranty claim not found' });
        }
        res.json(claim);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Cập nhật yêu cầu bảo hành
async function updateWarrantyClaim(req, res) {
    try {
        const { id } = req.params;
        const claim = req.body;
        const success = await warrantyClaimModel.updateWarrantyClaim(id, claim);
        if (!success) {
            return res.status(404).json({ error: 'Warranty claim not found' });
        }
        res.json({ message: 'Warranty claim updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Xóa yêu cầu bảo hành
async function deleteWarrantyClaim(req, res) {
    try {
        const { id } = req.params;
        const success = await warrantyClaimModel.deleteWarrantyClaim(id);
        if (!success) {
            return res.status(404).json({ error: 'Warranty claim not found' });
        }
        res.json({ message: 'Warranty claim deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Lấy yêu cầu bảo hành theo user_id
async function getWarrantyClaimsByUserId(req, res) {
    try {
        const { userId } = req.params;
        const claims = await warrantyClaimModel.getWarrantyClaimsByUserId(userId);
        res.json(claims);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Lấy yêu cầu bảo hành theo product_id
async function getWarrantyClaimsByProductId(req, res) {
    try {
        const { productId } = req.params;
        const claims = await warrantyClaimModel.getWarrantyClaimsByProductId(productId);
        res.json(claims);
    } catch (error) {
        res.status(500).json({ error: error.message });
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