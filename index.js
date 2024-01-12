const express = require('express');
const app = express();
const port = 9000;

const pool = require('./database/db');
const runQuery = require('./database/query');

// Import authentication routes
const authenticationRoutes = require('./routes/authenticationRoutes');

// Use the imported routes
app.use('/auth', authenticationRoutes);


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
