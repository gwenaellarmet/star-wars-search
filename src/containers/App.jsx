import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';

import SearchPage from './searchPage';
import ItemView from './ItemView';
import Layout from './Layout';

import { Route, Router, IndexRoute, hashHistory } from 'react-router'

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={SearchPage}></IndexRoute>
        <Route path=":type/:id" component={ItemView}></Route>
      </Route>
    </Router>
  </Provider>
);

export default App;
