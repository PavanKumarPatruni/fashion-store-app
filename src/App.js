import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import Header from './components/header'
import Footer from './components/footer';
import Dashboard from './components/dashboard';
import Wishlist from './components/wishlist';
import Cart from './components/cart';
import Item from './components/item';

import history from './components/history';

const App = ({ store }) => (
    <Provider store={store}>
      <Router history={history} basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/wishlist' component={Wishlist} />
            <Route path='/cart' component={Cart} />
            <Route path='/item/:id' component={Item} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;
