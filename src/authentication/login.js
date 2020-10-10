import React from 'react';
import { connect } from 'react-redux';
import Notification from '../notifications/notifications'
import LoginForm from './forms/loginForm'

import { setUser, setRedirect } from './actions'
import { setNotification } from '../notifications/actions';

import '../stylesheets/login.css'

export class Login extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  // AFTER back end update on login endpoint:
  // update action creator so it sets the correct error notification for incorrect credentials or
  // user has not yet verified their email address

  render(){
    const { setUser } = this.props
    return(
      <div className="loginContainer">
        <div className="login">
        <div className="notificationContainer">
          <Notification />
        </div>
          <LoginForm setUser={setUser} />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    verificationProcess: state.verificationProcess
  };
}

export default connect(mapStateToProps, {setUser, setRedirect, setNotification})(Login);
