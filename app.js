const express = require('express');
const app = express();
const port = process.env.PORT;
const con = require('./database/db');
const methodOverride = require('method-override');


app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

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
            return res.status(500).send('Erro interno do servidor');
        }
        res.redirect('/product')
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

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body
    const sql = `UPDATE frut SET name = '${name}', quantity = '${quantity}' WHERE id = '${id}'`;
    con.query(sql, (error, results, fields) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o produto no banco de dados.' });
        }
        console.log('Produto atualizado com sucesso:', results);
        res.redirect('/product')
    });

});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM frut WHERE id = ${id}`;

    con.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro interno no servidor');
            return;
        }
        res.redirect('/product')
    })
});

app.listen(port, () => {
    console.log('A porta está funcionando');
});

