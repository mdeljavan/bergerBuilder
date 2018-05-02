import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import burgerBilderReducer from './store/redeucer/burgerBuilder';
import orderReducer from './store/redeucer/order';
import authReducer from './store/redeucer/auth';
const rootReducer = combineReducers( {
  Bb:burgerBilderReducer,
  o: orderReducer,
  auth:authReducer
})
const composeEnhancers = process.env.NODE_ENV === 'development' ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;
const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk ) ) );
const app = (
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

)
ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
