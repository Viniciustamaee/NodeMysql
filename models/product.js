const con = require('./db/db')

con.connect(function () {
    let sql = "CREATE TABLE frut (name VARCHAR(255), quantity int)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    })
});

module.exports = con;