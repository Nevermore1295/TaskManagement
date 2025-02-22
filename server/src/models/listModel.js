const List = {
    create: (name, boardId) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO list (name, board_id) VALUES (?, ?)', [name, boardId], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    findByBoardId: (boardId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM list WHERE board_id = ?', [boardId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = List;