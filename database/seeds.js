const con = require('./db')


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "INSERT INTO frut (name, quantity) VALUES ('goiaba', '30')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});