const storeModel = require('../models/store.model');

// Tạo cửa hàng mới
async function createStore(req, res) {
    try {
        const store = req.body;
        const id = await storeModel.createStore(store);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Lấy tất cả cửa hàng
async function getAllStores(req, res) {
    try {
        const stores = await storeModel.getAllStores();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Lấy cửa hàng theo id
async function getStoreById(req, res) {
    try {
        const { id } = req.params;
        const store = await storeModel.getStoreById(id);
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json(store);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Cập nhật cửa hàng
async function updateStore(req, res) {
    try {
        const { id } = req.params;
        const store = req.body;
        const success = await storeModel.updateStore(id, store);
        if (!success) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json({ message: 'Store updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Xóa cửa hàng
async function deleteStore(req, res) {
    try {
        const { id } = req.params;
        const success = await storeModel.deleteStore(id);
        if (!success) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json({ message: 'Store deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore
}; 