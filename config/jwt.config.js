require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN, // Token expiration time
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN, // Refresh token expiration time
}