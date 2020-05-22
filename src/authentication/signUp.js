import React from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../notifications/actions'
import Notification from '../notifications/notifications'
import SignUpForm from '../forms/signUpForm'

import '../stylesheets/inputs.css'
import '../stylesheets/buttons.css'
import '../stylesheets/signup.css'

export class SignUp extends React.Component {

  render(){
    const { setNotification } = this.props
    return(
      <div className="signupContainer">
        <div className="signup">
        <div className="notificationContainer">
          <Notification />
        </div>
          <SignUpForm setNotification={setNotification} />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    notificationData: state.notificationData
  }
}

export default connect(mapStateToProps, {setNotification})(SignUp);
