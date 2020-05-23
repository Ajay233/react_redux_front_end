import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Notification from '../notifications/notifications';

import { setVerficationProcess } from './actions'
import { setNotification } from '../notifications/actions'
import { post } from '../axiosRequests/requests'
import history from '../history'
import '../stylesheets/notifications.css'
import '../stylesheets/verify.css'


export class Verify extends React.Component {

  componentWillMount(){
    this.verifyUser();
  }

  verifyingMsg = () => {
    return <div>Verifying...</div>
  }

  verifiedMsg = () => {
    const { setNotification } = this.props
    const successMsg = "Your email has now been verified.  Please log in below to continue."
    setNotification(successMsg, "success", true);
    history.push("/login")
    // return <Redirect to="/login" />
  }

  notFoundMsg = () => {
      return (
        <div>
        <div id="verifyTitle">
          <div id="titleImg" >
            <img src={require("../public/icons/warning.png")} alt="" className="verifyTitleImg"/>
          </div>
          <div id="verifyTitleTxt" >Oops 404</div>
        </div>
          <p>Something went wrong, and the token you provided was not found.</p>
          <p>Possible causes can include:</p>
          <ul>
            <li>- You may have already verified your email address.  To check please click <Link to="/login">here</Link> to log in</li>
            <br/>
            <li>- If you copied and pasted the link into the browser address bar, you will need to check you did not miss any characters</li>
            <br/>
            <li>- You have accessed this page in error, in which case you will need to return to the <Link to="/">home</Link> page</li>
          </ul>
        </div>
      );
  }

  tokenExpiredMsg = () => {
      return (
        <div>
          <div id="verifyTitle">
            <div id="titleImg" >
              <img src={require("../public/icons/warning.png")} alt="" className="verifyTitleImg"/>
            </div>
            <div id="verifyTitleTxt" >Token Expired</div>
          </div>
          <p>Your token has expired as it was issued more than 24 hours ago.</p>
          <p>Please click resend to resend a new token</p>
          <button id="resendButton" className="resend" onClick={this.handleResend}>Resend</button>
        </div>
      );
  }

  handleResend = () => {
    const successMsg = "Token resent to the email provided during signup, please check your email and use the link provided to complete the sign up process";
    console.log(this.props.verificationProcess.token);
    const data = {'userId': 0, 'token': this.props.verificationProcess.token}
    post("auth/resendToken", data).then((response) => {
      this.props.setNotification(successMsg, "success", true);
    }).catch((error) => {
      console.log(error.response)
      this.props.setNotification(error.response.data, "error", true);
    })
  }

  getToken = () => {
    // let url = window.location.href;
    let url = history.location.search;
    const regex = new RegExp(/(?<=token=)(s?)(.*)/gm);
    let token = url.match(regex).toString();
    return token;
  }

  verifyUser = (event) => {
    console.log("VERIFYING.....")
    let token = this.getToken();
    const verificationDetails = {'userId': 0, 'token': token}
    this.props.setVerficationProcess('auth/verify', verificationDetails);
  }

  renderLogo = () => {
    const { data } = this.props.verificationProcess.error;
    if(data === "TOKEN_EXPIRED"){
      return <img id="contentImg" src={require("../public/icons/expired.png")} alt="" />
    } else if(data === "TOKEN_UNMATCHED") {
      return <img id="contentImg" src={require("../public/icons/notFound.png")} alt=""/>
    } else {
      return null;
    }
  }

  renderMsg = () => {
    const { data } = this.props.verificationProcess.error;
    if(data === "TOKEN_EXPIRED"){
      return this.tokenExpiredMsg();
    } else if(data === "TOKEN_UNMATCHED") {
      return this.notFoundMsg();
    } else {
      return null;
    }
  }

  render(){
    return(
      <div id="verifyContainer">
        {console.log(this.props.verificationProcess)}
        {this.props.verificationProcess.completionStatus === "" ? this.verifyingMsg() : null}
        {this.props.verificationProcess.completionStatus === "completed" ? this.verifiedMsg() : null}
        <Notification />
        <div id="verifyContent">
          <div id="verifyLogo">
            {this.renderLogo()}
          </div>
          <div id="verifyMessage">
            {this.renderMsg()}
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    verificationProcess: state.verificationProcess
  }
}

export default connect(mapStateToProps, {setVerficationProcess, setNotification})(Verify);
