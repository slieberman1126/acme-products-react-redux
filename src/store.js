import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

const _loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products,
});

const _deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product,
});

const _createProduct = product => ({
  type: CREATE_PRODUCT,
  product,
});

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      state = action.products;
      break;
    case DELETE_PRODUCT:
      state = state.filter(product => product.id !== action.product.id);
      break;
    case CREATE_PRODUCT:
      state = [...state, action.product].sort(
        (a, b) => (a.rating > b.rating ? -1 : 1)
      );
      break;
  }
  return state;
};

const reducer = combineReducers({
  products: productsReducer,
});

const loadProducts = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(_loadProducts(products)));
  };
};

const createProduct = product => {
  return dispatch => {
    return axios
      .post('/api/products', product)
      .then(response => response.data)
      .then(product => dispatch(_createProduct(product)));
  };
};

const deleteProduct = (product, history) => {
  return dispatch => {
    return axios
      .delete(`/api/products/${product.id}`)
      .then(response => response.data)
      .then(() => dispatch(_deleteProduct(product)))
      .then(() => history && history.push('/products'));
  };
};

export default createStore(reducer, applyMiddleware(logger, thunk));

export { createProduct, loadProducts, deleteProduct };
