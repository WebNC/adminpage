import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';

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
