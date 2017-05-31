require("babel-core/register");
require("babel-polyfill");

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import App from './components/app';
import rootReducer from './reducers';

const middlewareComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk];
const store = createStore(rootReducer, middlewareComposer(
	applyMiddleware(...middleware)
));

import rootSaga from './sagas/rootSaga';
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
