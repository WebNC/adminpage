import React from 'react';
import Login from './components/login/Login';
import Register from './components/register/Register';

import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";

function App() {
  return <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router >
} 

export default App;
