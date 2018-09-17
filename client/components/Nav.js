import React from 'react';
import { setFilter, createProduct } from '../store';
import { connect } from 'react-redux';
import faker from 'faker';

const Nav = ({ _createProduct, topRated, products }) => {
  return (
    <ul>
      <li onClick={() => setFilter('ALL')}>Products ({products.length})</li>
      <li onClick={() => setFilter('MAX')}>Top Rated ({topRated.name})</li>
      <button
        onClick={() =>
          _createProduct({
            name: faker.commerce.product(),
            rating: Math.floor(Math.random() * 10),
          })
        }
      >
        Create product
      </button>
    </ul>
  );
};
const mapStateToProps = ({ topRated, products }) => {
  return {
    topRated,
    products,
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
