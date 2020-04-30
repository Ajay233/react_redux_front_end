import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Notification from '../notifications/notifications'

import { setUser, setRedirect } from './actions'
import { setNotification } from '../notifications/actions';

import '../stylesheets/login.css'
import '../stylesheets/inputs.css'
import '../stylesheets/buttons.css'
import '../stylesheets/notifications.css'

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showVerified: false,
      doVerify: this.props.verify
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {setNotification } = this.props
    const loginDetails =  {'email': this.state.email,'password': this.state.password}
    this.props.setUser('auth/login', loginDetails, setNotification);
    // this.props.setRedirect(true);
  }

  redirect = () => {

  }

  welcomeMsg = () => {
      if(this.props.userData.loggedIn === true){
        return this.props.userData.loggedIn ? <Redirect to="/" /> : null;
      }
  }

  verifiedMsg = () => {
    return `Thank you, your email has now been verified.  Please login below to use the quiz app :)`
  }

  notVerifiedMsg = () => {
    const msg = "You have not yet verified your email address. \n\n You will need to do this to complet the registration process"
    this.props.setNotification(msg, "error", true);
  }

  render(){
    return(
      <div className="loginContainer">
        <div>{this.props.verificationProcess.completionStatus === "completed" ? this.verifiedMsg() : null}</div>
        <div className="login">
        <div className="notificationContainer">
        {this.welcomeMsg()}
        <Notification />
        </div>
          <form onSubmit={this.handleSubmit} className="loginForm">
            <div className="loginTitle">Login</div>
            <label>Username (Email address):</label>
            <input name="email" onChange={this.handleChange} className="inputBox"></input>
            <label>Password:</label>
            <input name="password" type="password" onChange={this.handleChange} className="inputBox"></input>
            <button className="submit loginButton">Login</button>
            <hr/>
          <div id="signUpLink">
            Don't have an account? <Link to="/signUp">Sign up</Link> here
          </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    verificationProcess: state.verificationProcess
  };
}
// export default Login;
export default connect(mapStateToProps, {setUser, setRedirect, setNotification})(Login);
