const Attachment = {
    create: (cardId, userId, fileName, fileType) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO attachment (card_id, user_id, file_name, file_type) VALUES (?, ?, ?, ?)',
                [cardId, userId, fileName, fileType],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    },

    findByCardId: (cardId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM attachment WHERE card_id = ?', [cardId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = Attachment;