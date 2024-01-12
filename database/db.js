const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'book',
    password: 'root3254',
    port: '5432',
    // Maximum number of clients in the pool 
    max: 20,
    // How long a client is allowed to remain idle before being closed
    idleTimeoutMillis: 30000
});

module.exports = pool;