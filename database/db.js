const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "3950b3b7f950",
    user: "root",
    password: "1234",
    database: "product",
});


module.exports = con