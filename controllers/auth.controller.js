const db = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');
const User = require('../models/user.model'); // Import model User

//===== Đăng ký =====//
const register = async (req, res) => {
    const { fullName, email, password, phone} = req.body;

    if (!fullName || !email || !password || !phone) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const [existingUser] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const hashedPassword = await hashPassword(password);


        await db.execute(
            'INSERT INTO user (fullName, email, password, phone) VALUES (?, ?, ?, ?)',
            [fullName, email, hashedPassword, phone]
        );
        return res.status(201).json({ message: 'Đăng ký thành công' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
};

//===== Đăng nhập =====//
const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);
        const result = rows[0];

        if (!result) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const isMatch = await comparePassword(password, result.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const user = {
            id: result.id,
            fullName: result.fullName,
            email: result.email,
            role: result.role
        };
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ message: 'Đăng nhập thành công', accessToken, refreshToken, user });     
    }
    catch (error) {
        console.error('Lỗi đăng nhập:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
}

module.exports = {
    register,
    login
};