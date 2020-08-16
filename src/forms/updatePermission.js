import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { put } from '../axiosRequests/requests';
import { sessionExpired } from '../utils/session'

class UpdatePermission extends React.Component {

  renderSelect = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{formProps.label}</label>
        <div>
          <select {...formProps.input} className="inputBox select-medium">
            {formProps.children}
          </select>
        </div>
      </div>
    )
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  onSubmit = ({ permission }) => {
    const { id } = this.props.userResults;
    const { jwt } = this.props.userData;
    const successMsg = "Permission level saved";
    const data = { id: id, permission: permission }
    put("users/updatePermission", data, jwt).then((response) => {
      this.props.clearUserResults();
      this.props.setNotification(successMsg, "success", true);
    }).catch((error) => {
      console.log(error.response)
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        const errorMsg = error.response.data ? error.response.data : "Error - unable to update permission for this user"
        this.props.setNotification(errorMsg, "error", true);
      }
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-centered">
          <Field name="permission" component={this.renderSelect} label="Set Permission:">
            <option>Select permission level</option>
            <option value="USER">USER</option>
            <option value="READ-ONLY">READ-ONLY</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPER-USER">SUPER-USER</option>
          </Field>
          <button className="submit"><i className="far fa-save"></i> Save</button>
        </form>
      </div>
    );
  }

}

const validate = (formValues) => {
  const { permission } = formValues
  const errors = {}

  if(!permission){
    errors.permission = "This field must not be empty"
  }

  return errors
}

export default reduxForm({ form: 'updatePermission', validate: validate })(UpdatePermission)
