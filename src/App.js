import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom";
import Login from './containers/Login';
import Register from './containers/Register';
import Home from './containers/Home';
import Profile from './containers/Profile';

function App() {
  const isLogin = true;
  return <Router>
          <Switch>
            <Route exact path="/register" >
                {isLogin ? <Redirect to="/" /> : <Register />}
            </Route>
            <Route exact path="/login" >
              {isLogin ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/" >
              {!isLogin ? <Redirect to="/login" /> : <Home />}
            </Route>
            <Route exact path="/profile" >
              {!isLogin ? <Redirect to="/login" /> : <Profile />}
            </Route>
          </Switch>
        </Router >
} 

export default App;
