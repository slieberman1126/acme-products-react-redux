import React, { Component } from 'react';
import store, { loadProducts, createProduct, deleteProduct } from '../store';
import ProductList from './ProductList';
import Product from './Product';
import Nav from './Nav';
import { Provider } from 'react-redux';
import axios from 'axios';
import faker from 'faker';

class App extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.newProduct = this.newProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.sortRatings = this.sortRatings.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    axios
      .get('/api/products')
      .then(products => store.dispatch(loadProducts(products.data)));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  newProduct() {
    const rating = Math.floor(Math.random() * 10);
    axios
      .post('/api/products', { name: faker.commerce.product(), rating })
      .then(product => store.dispatch(createProduct(product.data)));
  }
  sortRatings() {
    return this.state.products.slice().sort((a, b) => b.rating - a.rating);
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <Nav />
          <ProductList />
        </div>
      </Provider>
    );
  }
}
export default App;
