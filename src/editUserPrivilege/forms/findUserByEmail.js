import React from 'react'
import { Field, reduxForm } from 'redux-form';

class FindUserByEmail extends React.Component {

  onSubmit = ({ email }) => {
    const { userData, setUserResults } = this.props;
    const param = {email: email}
    setUserResults(param, userData.jwt);
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
