const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Kiểm tra kết nối khi khởi động
pool
  .getConnection()
  .then((conn) => {
    console.log("✅ Kết nối database thành công!");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối database:", err.message);
  });

module.exports = pool;
