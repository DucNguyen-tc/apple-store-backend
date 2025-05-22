const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

//Tạo mã thông báo truy cập (access token)
function generateAccessToken(payload) {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
}

//Tạo mã thông báo làm mới (refresh token)
function generateRefreshToken(payload) {
    return jwt.sign(payload, jwtConfig.refreshSecret, { expiresIn: jwtConfig.refreshExpiresIn });
}

module.exports = 
{
    generateAccessToken,
    generateRefreshToken
};