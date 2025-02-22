//Định nghĩa API liên quan đến người dùng
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', authenticateToken, userController.getMe);
router.put('/profile', authenticateToken, userController.updateProfile);
router.post('/forgot-password', userController.forgotPassword);

module.exports = router;
