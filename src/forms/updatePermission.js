import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { put } from '../axiosRequests/requests';

class UpdatePermission extends React.Component {

  renderSelect = (formProps) => {
    return(
      <div>
        <label>{formProps.label}</label>
        <select {...formProps.input} className="inputBox">
          {formProps.children}
        </select>
      </div>
    )
  }

  onSubmit = ({ permission }) => {
    const { id } = this.props.userResults;
    const { jwt } = this.props.userData;
    const successMsg = "Permission level saved";
    const errorMsg = "";
    const data = { id: id, permission: permission }
    put("users/updatePermission", data, jwt).then((response) => {
      this.props.setUserResults([]);
      this.props.setNotification(successMsg, "success", true);
    }).catch((error) => {
      console.log(error.response)
      this.props.setNotification(error.response.data, "error", true);
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="permission" component={this.renderSelect} label="Set Permission:">
            <option>Select permission level</option>
            <option value="USER">USER</option>
            <option value="READ-ONLY">READ-ONLY</option>
            <option value="ADMIN">ADMIN</option>
          </Field>
          <button className="submit">Save</button>
        </form>
      </div>
    );
  }

}

export default reduxForm({ form: 'updatePermission' })(UpdatePermission)
