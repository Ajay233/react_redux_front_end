import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { getUsingParams } from '../axiosRequests/requests'
import { sessionExpired } from '../utils/session'

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
        const msg = error;
        this.props.setNotification(msg, "error", true);
        console.log(error.response)
      }
    });
  }

  renderInput = (formProps) => {
    return(
      <div>
        <label>{formProps.label}</label>
        <input {...formProps.input} className="inputBox" />
      </div>
    );
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="email" component={this.renderInput} label="Email:"/>
          <button className="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'findUserByEmail' })(FindUserByEmail)
