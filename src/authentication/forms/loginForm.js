import React from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

class LoginForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input {...formProps.input} type={ formProps.type ? formProps.type : "" }className="inputBox"/>
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null;
  }

  onSubmit = ({ userName, password }) => {
    const loginDetails =  {'email': userName,'password': password}
    this.props.setUser('auth/login', loginDetails)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="loginForm">
          <div className="loginTitle">Login</div>
          <Field name="userName" component={this.renderInput} label="Username (Email address):"/>
          <Field name="password" component={this.renderInput} type="password" label="Password:"/>
          <button ref={this.submitBtn} className="submit loginButton">Login</button>
          <hr/>
          <div id="signUpLink">
            Don't have an account? <Link to="/signUp" className="signUpLinkTag">Sign up</Link> here
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  const regex = /[^@]+@[^]+\..+/g
  if(!formValues.userName){
    errors.userName = "You must enter an email address"
  } else if(!formValues.userName.match(regex)){
    errors.userName = "You must enter a valid email address e.g. test@test.com"
  }

  if(!formValues.password){
    errors.password = "You must enter a password"
  }
  return errors
}

export default reduxForm({ form: 'loginForm', validate: validate })(LoginForm)
