import React, { Component } from 'react';
import store, { loadProducts } from '../store';
import ProductList from './ProductList';

import Nav from './Nav';
import { Provider } from 'react-redux';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadProducts());
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
