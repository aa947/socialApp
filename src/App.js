import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//import components
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute'

//import pages
import home from './pages/home';
import Login from './pages/login';
import signup from './pages/signup';

import jwtDecode from 'jwt-decode';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';


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
    <Provider store={store} >
    <div className="App">
  <Router>
  <Navbar />
    <div className="container">
    <Switch>
      <Route exact path='/' component={home}  />
      <AuthRoute exact path='/login' component={Login} authenticated={authenticated} />
      <AuthRoute exact path='/signup' component={signup} authenticated={authenticated} />
    </Switch>
    </div>
  </Router>

    </div>
    </Provider>
  );
}

export default App;
