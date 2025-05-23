function errorHandler(err, req, res, next) {
  console.error("Lỗi:", err.stack || err.message);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Có lỗi xảy ra ở server",
    errors: err.errors || undefined, // Thêm dòng này nếu muốn trả về chi tiết lỗi
  });
}

module.exports = errorHandler;
