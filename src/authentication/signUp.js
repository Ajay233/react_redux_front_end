import React from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../notifications/actions'
import { setLoaderState } from '../components/actions'
import Notification from '../notifications/notifications'
import SignUpForm from './forms/signUpForm'
import Loading from '../components/loading'

import '../stylesheets/inputs.css'
import '../stylesheets/buttons.css'
import '../stylesheets/signup.css'

export class SignUp extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  render(){
    const { setNotification, setLoaderState, globals } = this.props
    return(
      <div className="signupContainer">
        <Loading loaderState={globals.loaderState}/>
        <div className="signup">
        <div className="notificationContainer">
          <Notification />
        </div>
          <SignUpForm setNotification={setNotification} setLoaderState={setLoaderState}/>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    notificationData: state.notificationData,
    globals: state.globals
  }
}

export default connect(mapStateToProps, {setNotification, setLoaderState})(SignUp);
