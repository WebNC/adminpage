import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import './index.css';
import './api/axios.config'
import App from './containers/App'
import rootReducer from './reducers/index'


require('dotenv').config()


const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}> <App /></Provider>,
    document.getElementById('root'));


serviceWorker.unregister();



