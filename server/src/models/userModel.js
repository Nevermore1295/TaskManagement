const db = require('../config/database');

class User {
    // Tạo người dùng mới
    static async create(email, password, name) {
        const [result] = await db.execute(
            'INSERT INTO user (email, password, name) VALUES (?, ?, ?)',
            [email, password, name]
        );
        return { id: result.insertId, email, name };
    }

    // Tìm người dùng bằng email
    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM `user` WHERE email = ?', [email]);
        return rows.length ? rows[0] : null;
    }

    // Tìm người dùng bằng ID
    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM `user` WHERE id = ?', [id]);
        return rows.length ? rows[0] : null;
    }

    // Cập nhật mật khẩu
    static async updatePassword(id, newPassword) {
        await db.execute('UPDATE user SET password = ? WHERE id = ?', [newPassword, id]);
    }

    // Cập nhật thông tin người dùng
    static async updateUser(id, name, avatar) {
        await db.execute('UPDATE user SET name = ?, avatar = ? WHERE id = ?', [name, avatar, id]);
    }
}

module.exports = User;
