import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import Auth from '../hoc/auth';

import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from "./views/NavBar/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
    <div>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null ) } />
        <Route exact path="/login" component={Auth(LoginPage, false ) } />
        <Route exact path="/register" component={Auth(RegisterPage,  false) } />
      </Switch>
    </div>
  </Router>
  
  );
}

export default App;

