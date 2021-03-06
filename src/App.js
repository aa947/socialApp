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
import user from './pages/user';


import jwtDecode from 'jwt-decode';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

axios.defaults.baseURL =
"https://europe-west1-socialapp-2bf83.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
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
      <AuthRoute exact path='/login' component={Login} />
      <AuthRoute exact path='/signup' component={signup} />
      <Route exact path="/users/:handle" component={user} />
      <Route exact path="/users/:handle/scream/:screamId"
                  component={user}  />
    </Switch>
    </div>
  </Router>

    </div>
    </Provider>
  );
}

export default App;
