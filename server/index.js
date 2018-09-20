const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const db = require('./db');
app.use(morgan('dev'));
app.use(require('body-parser').json());

app.use(express.static(path.join(__dirname, '..', 'public')));
db.syncAndSeed();
app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
app.post('/api/products', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});
