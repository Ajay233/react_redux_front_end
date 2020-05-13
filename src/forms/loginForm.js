import React from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

const LoginForm = (props) => {

    // pass in as props: setUser

    const renderInput = (formProps) => {
      return(
        <div>
          <label>{ formProps.label }</label>
          <input {...formProps.input} className="inputBox"/>
        </div>
      );
    }

    const onSubmit = ({ userName, password }) => {
      const loginDetails =  {'email': userName,'password': password}
      props.setUser('auth/login', loginDetails);
    }

    return(
      <div>
        <form onSubmit={props.handleSubmit(onSubmit)} className="loginForm">
          <div className="loginTitle">Login</div>
          <Field name="userName" component={renderInput} label="Username (Email address):"/>
          <Field name="password" component={renderInput} label="Password:"/>
          <button className="submit loginButton">Login</button>
          <hr/>
          <div id="signUpLink">
            Don't have an account? <Link to="/signUp">Sign up</Link> here
          </div>
        </form>
      </div>
    );
}

export default reduxForm({ form: 'loginForm' })(LoginForm)
