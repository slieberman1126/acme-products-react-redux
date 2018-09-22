const path = require('path');
const express = require('express');
const db = require('./db');
const { Product } = db.models;

const app = express();
app.use(require('body-parser').json());

const port = process.env.PORT || 3000;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

const index = path.join(__dirname, 'index.html');

app.get('/', (req, res) => res.sendFile(index));

app.get('/api/products', (req, res, next) => {
  Product.findAll({
    order: [['rating', 'DESC']],
  })
    .then(products => res.send(products))
    .catch(next);
});

app.post('/api/products', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).send(product))
    .catch(next);
});

app.put('/api/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next);
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

app.listen(port, () => console.log(`listening on port ${port}`));

db.syncAndSeed();
