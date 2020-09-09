import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { getUsingParams } from '../../axiosRequests/requests'
import { sessionExpired } from '../../utils/session'

class FindUserByEmail extends React.Component {

  onSubmit = ({ email }) => {
    console.log(email);
    const param = {email: email}
    const { jwt } = this.props.userData;
    getUsingParams("users/findByEmail", param, jwt).then((response) => {
      this.props.setUserResults(response.data);
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        const msg = error.response.data;
        this.props.setNotification(msg, "error", true);
        console.log(error.response)
      }
    });
  }

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{formProps.label}</label>
        <input {...formProps.input} className="inputBox" />
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-centered">
          <Field name="email" component={this.renderInput} label="Email:"/>
          <button className="submit"><i className="fas fa-search"></i> Search</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { email } = formValues
  const errors = {}
  const regex = /[^@]+@[^]+\..+/g
  if(!email){
    errors.email = "You must enter an email address before a search can be conducted"
  } else if(!email.match(regex)){
    errors.email = "You must enter a valid email address e.g. test@test.com"
  }
  return errors
}

export default reduxForm({ form: 'findUserByEmail', validate: validate })(FindUserByEmail)
