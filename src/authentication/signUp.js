import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setNotification } from '../notifications/actions'
import Notification from '../notifications/notifications'

import '../stylesheets/inputs.css'
import '../stylesheets/buttons.css'
import '../stylesheets/signup.css'

class SignUp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      forename: "",
      surname: "",
      email: "",
      password: "",
      response: "",
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setResponse = (responseData) => {
    this.setState({ response: responseData })
  }

  renderNotification = () => {

  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    const successMsg = "An email has been sent to the email address you provided.  \n\n Please login and click the link provided to verify your email address and complete the registration process.  \n\n Once your email address has been verified you will be able to log into the quiz app";
    const errorMsg = "An account already exists for that email address"
    event.preventDefault();
    axios.post('http://localhost:8080/auth/signUp',{
        'forename': this.state.forename,
        'surname': this.state.surname,
        'email': this.state.email,
        'password': this.state.password
    }).then((response) => {
      // need to set notification data
      this.props.setNotification(successMsg, "verifyProcess", true);
      this.setResponse(response.data);
    }).catch((error) => {
      this.props.setNotification(errorMsg, "error", true);
      console.log(error.response);
    });
  }

  render(){
    return(
      <div className="signupContainer">
        <div className="signup">
        <div className="notificationContainer">
          <Notification />
        </div>
          <form className="signupForm" onSubmit={this.handleSubmit}>
            <div className="signupTitle">Create Account</div>
            <label>First Name:</label>
            <input className="inputBox" name="forename" onChange={this.handleChange}></input>
            <label>Surname:</label>
            <input className="inputBox" name="surname" onChange={this.handleChange}></input>
            <label>Email address:</label>
            <input className="inputBox" name="email" onChange={this.handleChange}></input>
            <label>Password:</label>
            <input className="inputBox" type="password" name="password" onChange={this.handleChange}></input>
            <button className="submit signupButton">Create Account</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notificationData: state.notificationData
  }
}

export default connect(mapStateToProps, {setNotification})(SignUp);
