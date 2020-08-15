import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { post } from '../axiosRequests/requests'
import { sessionExpired } from '../utils/session'
import { setNotification } from '../notifications/actions'


class PermissionChangeRequestForm extends React.Component {

  renderSelect = (formProps) => {
    const {permission} = this.props.userData
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <div>
          <select {...formProps.input} className="inputBox select-half">
            {formProps.children}
          </select>
        </div>
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  onSubmitRequest = ({permission}) => {
    const { userData, setNotification } = this.props
    const data = {
      forename: userData.forename,
      surname: userData.surname,
      email: userData.email,
      permission: userData.permission
    }
    post("users/updatePermissionRequest", data, userData.jwt).then((response) => {
      setNotification(response.data, "permissionRequest", true)
    }).catch((error) => {
      console.log(error.response)
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch)
      } else {
        setNotification("Unable to send request", "error", true)
      }
    })
  }

  render(){
    const { userData, formValues } = this.props
    return(
      <div id="editUserDetails">
      {console.log(this.props)}
      <form onSubmit={this.props.handleSubmit(this.onSubmitRequest)} className="profileForm">
        <div>
          <div id="editUserDetailsTitle">Permission Level</div>
        </div>
        <div>
          <div className="accountFieldText">Current permission level: {this.props.userData.permission}</div>
        </div>
        <Field name="permission" component={this.renderSelect} label="Permission level">
          <option value="" disabled>Select a category</option>
          {userData.permission === "READ-ONLY" ? null : <option value="READ-ONLY">READ-ONLY</option>}
          {userData.permission === "ADMIN" ? null : <option value="ADMIN">ADMIN</option>}
          {userData.permission === "SUPER-USER" ? null : <option value="SUPER-USER">SUPER-USER</option>}
        </Field>
        <button
          id="submitPermissionRequest"
          className="submit"
          disabled={this.props.pristine}
        >
          <i className="far fa-envelope"></i> Send Request
        </button>
      </form>
      </div>
    );
  }
}

const validate = (formValues, state) => {
  const errors = {};
  const { permission } = formValues

  if(permission === state.userData.permission){
    errors.permission = "You can only submit a request if a different permission is selected"
  }

  return errors
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps, {
  setNotification
})(reduxForm({
  form: 'permissionChangeRequest',
  validate: validate
})(PermissionChangeRequestForm))
