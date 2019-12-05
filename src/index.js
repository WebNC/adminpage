import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import './index.css';
import './api/axios.config'
import App from './App'
import rootReducer from './reducers/index'


require('dotenv').config()


// const store = createStore(rootReducer);
const store = createStore(rootReducer,
    applyMiddleware(thunk)
);


ReactDOM.render(
    <Provider store={store}> <App /></Provider>,
    document.getElementById('root'));


serviceWorker.unregister();



