import React from 'react';
import { deleteProduct } from '../store';
import { connect } from 'react-redux';

const Product = ({ product, deleteProduct }) => {
  const { name, rating } = product;
  return (
    <li>
      {name} {rating}
      <button onClick={() => deleteProduct(product)}>x</button>
    </li>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: product => dispatch(deleteProduct(product)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Product);
