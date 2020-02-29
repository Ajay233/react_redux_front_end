import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './navBar.js'
import Login from './login/login.js';
import SignUp from './login/signUp';

const tmp = () => {
  return(
    <div>
      This is a temporary placeholder page
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <NavBar />
          <Route path="/" exact component={tmp}/>
          <Route path="/login" render={() => <Login />}/>
          <Route path="/signUp" render={() => <SignUp />}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
