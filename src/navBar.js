import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render(){
    return(
      <div>NavBar
        <Link to="/">Home</Link>
        <Link to="/login">Go to Login</Link>
        <Link to="/signup">Go to Sign Up</Link>
        <hr/>
      </div>
    );
  }
}

export default NavBar;
