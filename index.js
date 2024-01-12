const express = require('express');
const app = express();
const port = 9000;

const pool = require('./database/db');
const runQuery = require('./database/query');

app.get('/', (req, res) => {
    runQuery((err, data) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Query result:');
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
