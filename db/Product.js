const conn = require('./conn');
const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 5,
  },
});

module.exports = Product;
