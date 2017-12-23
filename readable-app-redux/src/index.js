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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Redux store for the app and apply Redux Promise
// middleware for handling asyc server requests
const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(ReduxPromise))
);

// Enclose the application root component within:
// 1. BrowserRouter component to create a Single Page App (SPA)
// 2. Provider component to share the application state
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
