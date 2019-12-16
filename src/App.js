/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom";
import { connect } from 'react-redux'

import Login from './containers/Login/Login';
import Register from './containers/Register';
import Home from './containers/Home/Home';
import Profile from './containers/ChangeProfile/Profile';
import UserDetail from './components/UserDetail/UserDetail';



require('dotenv').config()


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      logined : localStorage.getItem("token") != undefined && true
    }
  }

  UNSAFE_componentWillReceiveProps = nextProps =>{
    let {logined} = this.state;
    logined = nextProps.store.isLogin;
    this.setState({logined})
  }

  componentDidMount = () =>{
    let {logined} = this.state;
    logined = localStorage.getItem("token")!= undefined && true;
    this.setState({logined})
  }

  render(){
    const {logined} = this.state;
    //  const id = '5de73e09f2deb15b346d89aa';
    // console.log(this.props.match)

    return <Router>
    <Switch>

      <Route exact path="/login" >
        {logined ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/" >
        {!logined ? <Redirect to="/login" /> : <Home />}
      </Route>
      <Route exact path="/register" >
          {!logined ? <Redirect to="/login" /> : <Register />}
      </Route>
      <Route exact path="/profile" >
        {!logined ? <Redirect to="/login" /> : <Profile />}
      </Route>
      {/* <Route exact path="/:id" >
        {!logined ? <Redirect to="/login" /> : <UserDetail />}
      </Route > */}

      <Route  exact path="/:id"   component={UserDetail} />
      <Route  exact path="/contract/:id"   component={UserDetail} />
      <Route  exact path="/report/:id"   component={UserDetail} />


    </Switch>
  </Router >
} 
}
 

const mapStateToProps = state => ({
  store: state.login,
})


export default connect(mapStateToProps, null)(App);

