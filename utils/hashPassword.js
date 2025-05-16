const bcrypt = require('bcrypt');

//Mã hoá mật khẩu
async function hashPassword(password) {
    const salt = 10; 
    return await bcrypt.hash(password, salt);
}

// So sánh mật khẩu
async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };