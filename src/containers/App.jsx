import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import Layout from './Layout';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);

export default App;
