import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './index.css';

import App from './App';
import appReducer from './reducers';

// https://github.com/zalmoxisus/redux-devtools-extension
// If you write the way below:
// ..., compose(
//   applyMiddleware(ReduxPromise),
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// )
// It will work in Chrome but break in Safari.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(ReduxPromise))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
