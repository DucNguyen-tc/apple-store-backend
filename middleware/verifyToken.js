const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization; //Lấy giá trị của header authorization

    // Kiểm tra xem header authorization có tồn tại hay không
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Không có token hoặc token sai định dạng' });
    }
    // Authorization có định dạng: Bearer <access_token>
    const token = authHeader.split(' ')[1]; // Tách token ra khỏi header

    try {
        const decoded = jwt.verify(token, jwtConfig.secret); // Giải mã token bằng secret key
        req.user = decoded; // Lưu thông tin người dùng vào req.user để sử dụng trong các middleware hoặc route sau này
        next(); // Gọi middleware tiếp theo
    }
    catch (error) {
        return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
}

module.exports = verifyToken; // Xuất middleware verifyToken để sử dụng trong các route khác