const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');

// Tạo bài viết mới
router.post('/', articleController.createArticle);

// Lấy tất cả bài viết
router.get('/', articleController.getAllArticles);

// Lấy bài viết theo id
router.get('/:id', articleController.getArticleById);

// Cập nhật bài viết
router.put('/:id', articleController.updateArticle);

// Xóa bài viết
router.delete('/:id', articleController.deleteArticle);

module.exports = router; 