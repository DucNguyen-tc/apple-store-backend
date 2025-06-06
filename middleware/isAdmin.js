function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  }
  return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
}

module.exports = isAdmin;