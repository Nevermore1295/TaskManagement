const Card = {
    create: (listId, title, description, dueDate, position) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO card (list_id, title, description, due_date, position) VALUES (?, ?, ?, ?, ?)',
                [listId, title, description, dueDate, position],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    },

    findByListId: (listId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM card WHERE list_id = ?', [listId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = Card;