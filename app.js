const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;


const con = mysql.createConnection({
    host: "3b0805d9d633",
    user: "root",
    password: "1234",
    database: "primeiraTabela",
});


con.connect((err) => {
    if (err) {
        if (err.code === 'ETIMEDOUT') {
            throw new Error('Timeout ao conectar ao MySQL: ' + err.message);
        } else {
            throw new Error('Erro ao conectar ao MySQL: ' + err.message);
        }
    }
    console.log('Conectado ao MySQL');
    // var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table created");
    // });
});


app.get('/', (req, res) => {
    res.send('DEU CERTO');
});


app.get('/dog', (req, res) => {
    res.send('AUUUUUUUUU')
})

app.listen(port, () => {
    console.log(`A porta está funcionando ${port}`);
});

