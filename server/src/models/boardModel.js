const Board = {
    create: (name) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO board (name) VALUES (?)', [name], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM board WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM board', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = Board;