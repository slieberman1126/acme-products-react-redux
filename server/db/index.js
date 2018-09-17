const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
});
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
