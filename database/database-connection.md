
---

# Postgres Database Connection in Node.js

This guide provides instructions on how to establish a PostgreSQL database connection in a Node.js application.

## Prerequisites

- Node.js installed on your machine
- PostgreSQL database server running
- Basic knowledge of Node.js and PostgreSQL

## Steps

Follow these steps to connect your Node.js application to a PostgreSQL database:

1. **Install Dependencies**

   Ensure you have the `pg` package installed. If not, you can install it using npm:

   ```bash
   npm install pg
   ```

2. **Database Configuration**

   Update your application code to include the necessary PostgreSQL connection configuration. You can use a library like `pg` to create a connection pool.

   ```javascript
   const { Pool } = require('pg');

   const pool = new Pool({
       user: 'your_username',
       host: 'your_host',
       database: 'your_database',
       password: 'your_password',
       port: 'your_port',
       // Additional options...
   });

   module.exports = pool;
   ```

3. **Executing Queries**

   Create a module for executing queries. For example:

   ```javascript
   // query.js

   const pool = require('./db');

   function runQuery(callback) {
       pool.query('SELECT * FROM your_table;', (err, result) => {
           if (err) {
               console.error('Error executing query:', err);
               callback(err, null);
           } else {
               callback(null, result.rows);
           }
       });
   }

   module.exports = runQuery;
   ```

4. **Usage in Your Express App**

   Integrate the database connection and query execution into your Express application:

   ```javascript
   // app.js

   const express = require('express');
   const app = express();
   const port = 9000;

   const runQuery = require('./query');

   app.get('/', (req, res) => {
       runQuery((err, data) => {
           if (err) {
               console.error('Error:', err);
               res.status(500).send('Internal Server Error');
           } else {
               console.log('Query result:', data);
               res.json(data);
           }
       });
   });

   app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
   });
   ```

## Additional Resources

For more detailed information on connecting PostgreSQL databases in Node.js, you can refer to the following link:

[How to Connect PostgreSQL Database in Node.js](https://scalegrid.io/blog/how-to-connect-postgresql-database-in-node-js/)

Feel free to explore the provided link for additional insights and best practices.

---

Make sure to replace placeholders like `your_username`, `your_host`, `your_database`, `your_password`, `your_port`, and `your_table` with your actual database details.