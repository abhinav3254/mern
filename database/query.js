const pool = require('./db');


function runQuery(callback) {
    pool.query('SELECT * FROM book;', (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null); // Pass the error to the callback
        } else {
            // Pass the result to the callback
            callback(null, result.rows);
        }
    });
}

module.exports = runQuery;