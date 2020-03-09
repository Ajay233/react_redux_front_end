import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import {
  logOutUser
} from './authentication/actions'
import './stylesheets/navBar.css'
import './stylesheets/buttons.css'

class NavBar extends React.Component {

  logOut = () => {
    this.props.logOutUser();
  }

  renderSignUp = () => {
    return this.props.userData.loggedIn === true ? null : <Link to="/signup" className="links">Go to Sign Up</Link>
  }

  renderLogin = () => {
    return this.props.userData.loggedIn === true ? null : <Link to="/login" className="links">Go to Login</Link>
  }

  renderLogout = () => {
    return this.props.userData.loggedIn === true ? <button className="linkButton links" onClick={this.logOut}>Logout</button> : null
  }

  redirect = () => {
    return this.props.userData.loggedIn === false ? <Redirect to="/logout" /> : null
  }

  render(){
    return(
      <div className="nav">
        <strong>The Quiz App</strong>
        <Link to="/" className="links">Home</Link>
        {this.renderLogin()}
        {this.renderSignUp()}
        {this.renderLogout()}
        {this.redirect()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {userData: state.userData};
}

export default connect(mapStateToProps, {logOutUser})( NavBar);
