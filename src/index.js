import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const root = document.getElementById('root');
import store, { loadProducts, deleteProduct, createProduct } from './store';

import Nav from './Nav';
import ProductList from './ProductList';
import Product from './Product';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadProducts());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route component={Nav} />
            <Route exact path="/products" component={ProductList} />
            <Route
              path="/products/:id"
              render={({ history, match }) => (
                <Product id={match.params.id * 1} history={history} />
              )}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<App />, root);
