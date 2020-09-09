import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { put } from '../../axiosRequests/requests';
import { sessionExpired } from '../../utils/session'

class ChangePassword extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderFieldValidationError(formProps.meta)}
        <label>{formProps.label}</label>
        <input id={`ChangePassword - ${formProps.input.name}`} {...formProps.input} type="password" className="inputBox"/>
      </div>
    );
  }

  renderFieldValidationError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  errorMsg = (error) => {
    switch (error) {
      case "PASSWORD MISMATCH": return "Retyped password did not match the new password";
      case "NO MATCH": return "The password you provided was incorrect";
      case "PASSWORD INCORRECT": return "The password you provided was incorrect";
      default: return "An error has occurred please ty again";
    }
  }

  onSubmit = ({ password, newPassword, retypedPassword }) => {
    const successMsg = "Password changed";
    const { id, email, jwt } = this.props.userData;
    const data = {
      id: id,
      email: email,
      password: password,
      newPassword: newPassword,
      retypedPassword: retypedPassword
    }
    put("users/updatePassword", data, jwt).then((response) => {
      this.props.setNotification(successMsg, "success", true);
      console.log(response);
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        this.props.setNotification(this.errorMsg(error.response.data), "error", true);
        console.log(error.response.data);
      }
    })
  }

  render(){
    return(
      <div id="changePassword">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="changePasswordForm">
          <div>
            <div id="changePasswordTitle">Change Password</div>
          </div>
          <Field name="password" component={this.renderInput} label="Current Password:"/>
          <Field name="newPassword" component={this.renderInput} label="New Password:"/>
          <Field name="retypedPassword" component={this.renderInput} label=" Re-type Password:"/>
          <button id="submitChangePassword" className="submit">Submit</button>
        </form>
      </div>
    )
  }

}

const validate = (formValues) => {
  const { password, newPassword, retypedPassword } = formValues
  const errors = {}

  if(!password){
    errors.password = "This field must not be empty"
  }

  if(!newPassword){
    errors.newPassword = "This field must not be empty"
  }

  if(!retypedPassword){
    errors.retypedPassword = "This field must not be empty"
  }
  return errors
}

export default reduxForm({ form: 'changePassword', validate: validate })(ChangePassword)
