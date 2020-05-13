import React from 'react'
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';

class SignUpForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input
          {...formProps.input}
          type={formProps.type ? formProps.type : ""}
          autoComplete="off"
          className={`inputBox ${formProps.meta.error && formProps.meta.touched ? 'inputBoxError' : null}`}
        />
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null;
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
          <button className="submit signupButton" >Create Account</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {}
  const regex = /[^@]+@[^]+\..+/g
  if(!formValues.forename){
    errors.forename = "You must enter your first name"
  }

  if(!formValues.surname){
    errors.surname = "you must enter your surname"
  }

  if(!formValues.email){
    errors.email = "you must enter an email address"
  } else if(!formValues.email.match(regex)){
    errors.email = "you must enter a valid email address e.g. test@test.com"
  }

  if(!formValues.password){
    errors.password = "you must enter a password"
  }
  return errors
}

export default reduxForm({ form: 'signUpForm', validate: validate })(SignUpForm)
