import React from 'react'
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';

class SignUpForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        <label>{ formProps.label }</label>
        <input {...formProps.input} type={formProps.type ? formProps.type : ""} className="inputBox"/>
      </div>
    );
  }

  onSubmit = ({ forename, surname, email, password }) => {
    const { setNotification } = this.props
    const successMsg = "An email has been sent to the email address you provided.  \n\n Please login and click the link provided to verify your email address and complete the registration process.  \n\n Once your email address has been verified you will be able to log into the quiz app";
    const errorMsg = "An account already exists for that email address"
    axios.post('http://localhost:8080/auth/signUp',{
        'forename': forename,
        'surname': surname,
        'email': email,
        'password': password
    }).then((response) => {
      console.log(response.data);
      setNotification(successMsg, "verifyProcess", true);
    }).catch((error) => {
      console.log(error.response);
      setNotification(errorMsg, "error", true);
    });
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="signupForm">
          <div className="signupTitle">Create Account</div>
          <Field name="forename" component={this.renderInput} label="First Name:"/>
          <Field name="surname" component={this.renderInput} label="Surname:"/>
          <Field name="email" component={this.renderInput} label="Email address:"/>
          <Field name="password" component={this.renderInput} type="password" label="Password:"/>
          <button className="submit signupButton">Create Account</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'signUpForm' })(SignUpForm)
