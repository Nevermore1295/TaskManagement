const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

// Đăng ký tài khoản
exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create(email, hashedPassword, name);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        console.log("Mật khẩu nhập vào:", password);
        console.log("Mật khẩu trong DB:", user.password);

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

// Lấy thông tin người dùng hiện tại
exports.getMe = async (req, res) => {
    try {
        //const user = await User.findById(req.user.id);
        const user = await User.findByEmail(req.user.email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user data' });
    }
};

// Cập nhật thông tin người dùng
exports.updateProfile = async (req, res) => {
    try {
        const { name, avatar } = req.body;
        await User.updateUser(req.user.id, name, avatar);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile' });
    }
};

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findByEmail(email);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Tạo mật khẩu mới
        const newPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        await User.updatePassword(user.id, hashedPassword);

        // Gửi email
        await sendEmail(email, 'Password Reset', `Your new password is: ${newPassword}`);
        res.json({ message: 'New password has been sent to your email' });
    } catch (error) {
        res.status(500).json({ error: 'Error processing password reset' });
    }
};
