/* eslint-disable camelcase */
import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom";

import Login from './containers/Login';
import Register from './containers/Register';
import Home from './containers/Home';
import Profile from './containers/Profile';

require('dotenv').config()


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      logined : localStorage.getItem("token") && true
    }
  }

  UNSAFE_componentWillReceiveProps = nextProps =>{
    let {logined} = this.state;
    logined = nextProps.store.isLogin;
    this.setState({logined})
  }

  componentDidMount = () =>{
    let {logined} = this.state;
    logined = localStorage.getItem("token") && true;
    this.setState({logined})
  }

  render(){
    const {logined} = this.state;
    return <Router>
    <Switch>
      <Route exact path="/register" >
          {logined ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route exact path="/login" >
        {logined ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/" >
        {!logined ? <Redirect to="/login" /> : <Home />}
      </Route>
      <Route exact path="/profile" >
        {!logined ? <Redirect to="/login" /> : <Profile />}
      </Route>
    </Switch>
  </Router >
} 
}
 
export default App;
