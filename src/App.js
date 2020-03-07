import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './navBar.js'
import Login from './authentication/login';
import SignUp from './authentication/signUp';
import Verify from './authentication/verify';

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
          <Route path="/login" render={() => <Login verify={false} />}/>
          <Route path="/signUp" render={() => <SignUp />}/>
          <Route path="/verify" render={() => <Verify />}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
