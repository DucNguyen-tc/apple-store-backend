const articleModel = require('../models/article.model');

// Tạo bài viết mới
async function createArticle(req, res) {
    try {
        const article = req.body;
        const id = await articleModel.createArticle(article);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Lấy tất cả bài viết
async function getAllArticles(req, res) {
    try {
        const articles = await articleModel.getAllArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Lấy bài viết theo id
async function getArticleById(req, res) {
    try {
        const { id } = req.params;
        const article = await articleModel.getArticleById(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Cập nhật bài viết
async function updateArticle(req, res) {
    try {
        const { id } = req.params;
        const article = req.body;
        const success = await articleModel.updateArticle(id, article);
        if (!success) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json({ message: 'Article updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Xóa bài viết
async function deleteArticle(req, res) {
    try {
        const { id } = req.params;
        const success = await articleModel.deleteArticle(id);
        if (!success) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
}; 