import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './navBar.js'
import Home from './home';
import Login from './authentication/login';
import SignUp from './authentication/signUp';
import Verify from './authentication/verify';
import Logout from './authentication/logout';
import UserList from './userList/userList'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <NavBar />
          <Route path="/" exact render={() => <Home />}/>
          <Route path="/login" render={() => <Login verify={false} />}/>
          <Route path="/signUp" render={() => <SignUp />}/>
          <Route path="/verify" render={() => <Verify />}/>
          <Route path="/logout" component={Logout} />
          <Route path="/userList" component={() => <UserList/>} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
