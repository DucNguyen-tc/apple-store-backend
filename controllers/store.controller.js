const storeModel = require('../models/store.model');

// Tạo cửa hàng mới
async function createStore(req, res, next) {
    try {
        const store = req.body;
        if (!store.name || !store.address) {
            return res.status(400).json({ error: 'Name and address are required' });
        }
        const id = await storeModel.createStore(store);
        res.status(201).json({ id });
    } catch (error) {
        next(error);
    }
}

// Lấy tất cả cửa hàng
async function getAllStores(req, res, next) {
    try {
        const stores = await storeModel.getAllStores();
        res.json(stores);
    } catch (error) {
        next(error);
    }
}

// Lấy cửa hàng theo id
async function getStoreById(req, res, next) {
    try {
        const { id } = req.params;
        const store = await storeModel.getStoreById(id);
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json(store);
    } catch (error) {
        next(error);
    }
}

// Cập nhật cửa hàng
async function updateStore(req, res, next) {
    try {
        const { id } = req.params;
        const store = req.body;
        if (!store.name || !store.address) {
            return res.status(400).json({ error: 'Name and address are required' });
        }
        const success = await storeModel.updateStore(id, store);
        if (!success) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json({ message: 'Store updated successfully' });
    } catch (error) {
        next(error);
    }
}

// Xóa cửa hàng
async function deleteStore(req, res, next) {
    try {
        const { id } = req.params;
        const success = await storeModel.deleteStore(id);
        if (!success) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json({ message: 'Store deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore
}; 