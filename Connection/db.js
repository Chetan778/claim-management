const Pool = require('pg').Pool;

const pool =  new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Welcome@779",
    database: "chetan"
});

module.exports = pool;
