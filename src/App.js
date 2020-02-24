import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//import components
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute'

//import pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

import jwtDecode from 'jwt-decode';


const token = localStorage.FBIdToken;
let authenticated;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp *1000 < Date.now()){
    window.location.href="/";
    authenticated = false;
  } else {
    authenticated = true;
  }

}


function App() {
  return (
    <div className="App">
  <Router>
  <Navbar />
    <div className="container">
    <Switch>
      <Route exact path='/' component={home}  />
      <AuthRoute exact path='/login' component={login} authenticated={authenticated} />
      <AuthRoute exact path='/signup' component={signup} authenticated={authenticated} />
    </Switch>
    </div>
  </Router>

    </div>
  );
}

export default App;
