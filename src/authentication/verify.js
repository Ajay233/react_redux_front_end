import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setVerficationProcess } from './actions'
import { post } from '../axiosRequests/requests'
import '..//stylesheets/notifications.css'


class Verify extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      verified: false,
      error: "",
      tokenResent: ""
    };
  }

  componentDidMount(){
    this.verifyUser();
  }

  setTokenResent = (status) => {
    this.setState({ tokenResent: status })
  }

  verifyingMsg = () => {
    return <div>Verifying...</div>
  }

  verifiedMsg = () => {
    return <div>Your email has now been verified, please click <Link to="/login">here</Link> to log in</div>
  }

  notFoundMsg = () => {
    if(this.props.verificationProcess){
      if(this.props.verificationProcess.error.data === "TOKEN_UNMATCHED"){
        return (
          <div className="error">
            <p>Something went wrong, and the token you provided was not found.</p>
            <p>Possible causes can include:</p>
            <ul>
              <li>You may have already verified your email address.  To check please click <Link to="/login">here</Link> to log in</li>
              <li>If you copied and pasted the link into the browser adress bar, you will need to check you did not miss any characters</li>
              <li>You have accessed this page in error</li>
            </ul>
          </div>
        );
      }
    }
  }

  tokenExpiredMsg = () => {
    if(this.props.verificationProcess){
      if(this.props.verificationProcess.error.data === "TOKEN_EXPIRED"){
        return (
          <div className="error">
            <p>Your token has expired as it was issued more than 24 hours ago.</p>
            <p>Please click resend to resend a new token</p>
            <button onClick={this.handleResend}>Resend</button>
          </div>
        );
      }
    }
  }

  resentMsg = () => {
    return <div>Token resent to the email provided during signup, please check your email and use the link provided to complete the sign up process</div>
  }

  handleResend = () => {
    console.log(this.props.verificationProcess.token);
    const data = {'userId': 0, 'token': this.props.verificationProcess.token}
    post("users/auth/resendToken", data).then((response) => {
      this.setTokenResent("Sent")
    }).catch((error) => {
      console.log(error.response)
    })
  }

  getToken = () => {
    let url = window.location.href;
    const regex = new RegExp(/(?<=token=)(s?)(.*)/gm);
    let token = url.match(regex).toString();
    return token;
  }

  verifyUser = (event) => {
    console.log("VERIFYING.....")
    let token = this.getToken();
    const verificationDetails = {'userId': 0, 'token': token}
    this.props.setVerficationProcess('users/auth/verify', verificationDetails);
  }

  render(){
    return(
      <div>
        {this.props.verificationProcess === "" ? this.verifyingMsg() :
        this.props.verificationProcess === "completed" ? this.verifiedMsg() : null}
        {this.tokenExpiredMsg()}
        {this.notFoundMsg()}
        {this.state.tokenResent === "Sent" ? this.resentMsg() : null}
        <Link to="/login">Go to login</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    verificationProcess: state.verificationProcess
  }
}

export default connect(mapStateToProps, {
  setVerficationProcess
})(Verify);
