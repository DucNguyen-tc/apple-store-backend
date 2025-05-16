const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

//Tạo mã thông báo truy cập (access token)
function generateAccessToken(payload) {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
}

module.exports = generateAccessToken;