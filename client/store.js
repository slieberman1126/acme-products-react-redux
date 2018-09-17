import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const SET_FILTER = 'SET_FILTER';

const _loadProducts = products => {
  return {
    products,
    type: LOAD_PRODUCTS,
  };
};
const _deleteProduct = product => {
  return {
    product,
    type: DELETE_PRODUCT,
  };
};
const _createProduct = product => {
  return {
    product,
    type: CREATE_PRODUCT,
  };
};
const setFilter = filter => {
  return {
    filter,
    type: SET_FILTER,
  };
};

const loadProducts = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(_loadProducts(products)));
  };
};
const deleteProduct = product => {
  return dispatch => {
    return axios
      .delete(`/api/products/${product.id}`)
      .then(() => dispatch(_deleteProduct(product)));
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

const productReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      state = action.products;
      break;
    case CREATE_PRODUCT:
      state = [...state, action.product];
      break;
    case DELETE_PRODUCT:
      state = state.filter(product => product.id !== action.product.id);
      break;
    default:
      return state;
  }
};
const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case SET_FILTER:
      state = action.filter;
      break;
    default:
      return state;
  }
};
const reducer = combineReducers({
  products: productReducer,
  filter: filterReducer,
});
const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
export { setFilter, loadProducts, createProduct, deleteProduct };
