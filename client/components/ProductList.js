import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';

/*const Products = props => (
  <ul>
    {props.products.map(product => (
      <Product
        key={product.id}
        id={product.id}
        rating={product.rating}
        {...product}
      />
    ))}
  </ul>
);

const mapStateToProps = ({products, rating}) => {
  const maxRank = Math.max(products.map(rating => ));
  const filterFunc = function(state, products) {
    if (state.filter === 'SHOW_MAX') {
      return maxRank;
    } else {
      return state.products;
    }
  };
  return {
    products: filterFunc(state, state.products),
  };
};
export default connect(mapStateToProps)(Products); */
const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
};
const mapStateToProps = state => {
  return { products: state.products };
};
export default connect(mapStateToProps)(ProductList);
