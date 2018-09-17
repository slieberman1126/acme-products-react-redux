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
const initialState = {
  products: [],
  topRated: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let topRating = 0;
      let topRated = {};
      action.products.forEach(product => {
        if (product.rating >= topRating) {
          topRating = product.rating;
          topRated = product;
        }
      });
      return { ...state, products: action.products, topRated: topRated };
    case CREATE_PRODUCT:
      if (action.product.rating >= state.topRated.rating) {
        return {
          ...state,
          products: [...state.products, action.product],
          topRated: action.product,
        };
      } else {
        return {
          ...state,
          products: [...state.products, action.product],
          topRated: [...state.topRated],
        };
      }

    case DELETE_PRODUCT:
      const toDelete = state.products.filter(
        product => product.id !== action.product.id
      );
      let top = 0;
      let topProduct = {};
      toDelete.forEach(product => {
        if (product.rating >= top) {
          top = product.rating;
          topProduct = product;
        }
      });
      return { ...state, products: toDelete, topRated: topProduct };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
export { setFilter, loadProducts, createProduct, deleteProduct };
