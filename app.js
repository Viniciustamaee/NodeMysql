const express = require('express');
const app = express();
const port = 3000;
const con = require('./database/db');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));


app.get('/product/new', (req, res) => {
    res.render('products/new')
})

app.get('/product/:id/edit', (req, res) => {
    const { id } = req.params;
    con.query(`SELECT * FROM frut WHERE id = ${id}`, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('products/edit', { result })
    });
})

app.post('/products', (req, res) => {
    console.log(req.body)
    const { name, quantity } = req.body
    const sql = 'INSERT INTO frut (name, quantity) VALUES (?, ?)';
    const values = [name, quantity];
    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao inserir produto no MySQL:', err);
            res.status(500).send('Erro interno do servidor');
        } else {
            res.redirect('/product')
        }
    });
});


app.get('/product', (req, res) => {
    const sql = "SELECT * FROM frut";
    con.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro ao obter os produtos');
            return;
        }
        res.render("products/index", { results })
    });
});

app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    con.query(`SELECT * FROM frut WHERE id = ${id}`, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('products/show', { result })
    });
})

app.listen(port, () => {
    console.log(`A porta está funcionando ${port}`);
});

