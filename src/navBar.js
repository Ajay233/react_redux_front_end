import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {
  logOutUser
} from './authentication/actions'
import './stylesheets/navBar.css'

class NavBar extends React.Component {

  logOut = () => {
    this.props.logOutUser();
  }

  render(){
    return(
      <div className="nav">
        <strong>The Quiz App</strong>
        <Link to="/" className="links">Home</Link>
        <Link to="/login" className="links">Go to Login</Link>
        <Link to="/signup" className="links">Go to Sign Up</Link>
        <button onClick={this.logOut}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {userData: state.userData};
}

export default connect(mapStateToProps, {logOutUser})( NavBar);
