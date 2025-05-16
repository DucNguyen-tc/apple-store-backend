const db = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');
const User = require('../models/user.model'); // Import model User

//===== Đăng ký =====//
const register = async (req, res) => {
    const { fullName, email, password, phone, role } = req.body;

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
            'INSERT INTO user (fullName, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, hashedPassword, phone, role]
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
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const payload = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        };
        const accessToken = generateToken(payload);

        res.json({ message: 'Đăng nhập thành công', accessToken });     
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