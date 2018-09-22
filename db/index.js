const conn = require('./conn');
const Product = require('./Product');

const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() =>
      Promise.all([
        Product.create({ name: 'foo', rating: 10 }),
        Product.create({ name: 'bar', rating: 8 }),
        Product.create({ name: 'bazz', rating: 5 }),
      ])
    );
};
module.exports = {
  models: {
    Product,
  },
  syncAndSeed,
};
