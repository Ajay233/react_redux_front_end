import React from 'react';
import { Field, reduxForm } from 'redux-form';


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
    const { updatePrivillege, userResults, userData } = this.props
    const data = { id: userResults.id, permission: permission }
    updatePrivillege(data, userData.jwt)
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
