import React from 'react';
import { setFilter, createProduct } from '../store';
import { connect } from 'react-redux';
import faker from 'faker';

const Nav = ({ _createProduct, allProducts, productName }) => {
  return (
    <ul>
      <li onClick={() => setFilter('ALL')}>Products ({allProducts})</li>
      <li onClick={() => setFilter('MAX')}>Top Rated ({productName})</li>
      <button
        onClick={() =>
          _createProduct({
            name: faker.commerce.product(),
            rating: faker.random.number({ min: 0, max: 10 }),
          })
        }
      >
        Create product
      </button>
    </ul>
  );
};
const mapStateToProps = ({ filter, products }) => {
  const allProducts = products.length;
  const productName = products.filter(product => product.max);
  return {
    filter,
    allProducts,
    productName,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    _createProduct: product => dispatch(createProduct(product)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
