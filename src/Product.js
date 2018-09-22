import React from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from './store';

const Product = ({ product, deleteProduct }) => {
  if (!product) {
    return null;
  }
  return (
    <div>
      {product.name}
      <button onClick={() => deleteProduct(product)}>x</button>
    </div>
  );
};

const mapStateToProps = ({ products }, { id }) => {
  const product = products.find(product => product.id === id);
  return {
    product,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteProduct: product => dispatch(deleteProduct(product, history)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
