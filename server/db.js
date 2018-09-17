const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: Sequelize.INTEGER,
});
const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() =>
      Promise.all([
        Product.create({ name: 'foo', rating: Math.round(Math.random() * 10) }),
        Product.create({ name: 'bar', rating: Math.round(Math.random() * 10) }),
        Product.create({
          name: 'bazz',
          rating: Math.round(Math.random() * 10),
        }),
      ])
    );
};
module.exports = {
  models: {
    Product,
  },
  syncAndSeed,
};
