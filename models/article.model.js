const db = require('../config/db');

// Tạo bài viết mới
async function createArticle(article) {
    try {
        const { title, content, image_url, published_at, author_id } = article;
        const [result] = await db.execute(
            'INSERT INTO articles (title, content, image_url, published_at, author_id) VALUES (?, ?, ?, ?, ?)',
            [title, content, image_url, published_at, author_id]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating article:', error);
        throw error;
    }
}

// Lấy tất cả bài viết
async function getAllArticles() {
    try {
        const [rows] = await db.execute('SELECT * FROM articles');
        return rows;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}

// Lấy bài viết theo id
async function getArticleById(id) {
    try {
        const [rows] = await db.execute('SELECT * FROM articles WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
    }
}

// Cập nhật bài viết
async function updateArticle(id, article) {
    try {
        const { title, content, image_url, published_at, author_id } = article;
        const [result] = await db.execute(
            'UPDATE articles SET title = ?, content = ?, image_url = ?, published_at = ?, author_id = ? WHERE id = ?',
            [title, content, image_url, published_at, author_id, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating article:', error);
        throw error;
    }
}

// Xóa bài viết
async function deleteArticle(id) {
    try {
        const [result] = await db.execute('DELETE FROM articles WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
    }
}

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
}; 