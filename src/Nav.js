import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ products, topRated }) => {
  return (
    <ul>
      <li>
        <Link to="/products">Products ({products.length})</Link>
      </li>
      {topRated ? (
        <li>
          <Link to={`/products/${topRated.id}`}>
            Top Rated ({topRated.name})
          </Link>
        </li>
      ) : null}
    </ul>
  );
};

const mapStateToProps = ({ products }) => {
  const topRated = products.reduce((memo, product) => {
    if (memo === undefined || product.rating > memo.rating) {
      memo = product;
    }
    return memo;
  }, undefined);
  return {
    products,
    topRated,
  };
};
export default connect(mapStateToProps)(Nav);
