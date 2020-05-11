import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { put } from '../axiosRequests/requests'
import { sessionExpired } from '../utils/session'


class EditProfileForm extends React.Component {

  // TODO:
  // Container class will need access to 'userData' and the 'setNotification' action creator
  // Will need to create a new action creator for the edit profile action
  //  - this will do the network request
  //  - call the setNotification action creator
  //  - then call the login action creator to update the userData?



  // formProps is always passed into the method you use in the Field 'component' attribute
  renderInput = (formProps) => {
    return(
      <div>
        <label>{formProps.label}</label>
        <input {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name) } className="inputBox"/>
      </div>
    );
  }

  renderPlaceholder = (name) => {
    const {forename, surname, email} = this.props.userData
    switch(name){
      case 'forename': return forename;
      case 'surname': return surname;
      default: return email;
    }
  }

  validateNewEmail = (email1, email2) => {
    return email1 ? email1 : email2
  }

  // We don't need event.preventDefault() because redux-form handles that for us
  onSubmitProfileChange = ({forename, surname, newEmail}) => {
    const successMsg = "Profile information updated";
    const errorMsg = "Error updating your profile data, please check the details you provided and try again";
    const {id, email, jwt} = this.props.userData
    console.log(newEmail)
    console.log(this.validateNewEmail(newEmail, email))
    const validatedNewEmail = this.validateNewEmail(newEmail, email);
    const data = {
      id: id,
      forename: forename,
      surname: surname,
      email: email,
      newEmail: validatedNewEmail
    }
    put('users/update', data, jwt).then((response) => {
      this.props.setNotification(successMsg, "success", true)
      console.log("Edited")
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        this.props.setNotification(errorMsg, "error", true)
        console.log(error.config)
        console.log(error.response)
      }
    });
  }

  // Check if changing the label will break anything

  render(){
    return(
      <div id="editUserDetails">
      <form onSubmit={this.props.handleSubmit(this.onSubmitProfileChange)} className="profileForm">
        <div>
        <div id="editUserDetailsTitle">Edit Personal Details</div>
        </div>
        <Field name="forename" component={this.renderInput} label="Forename"/>
        <Field name="surname" component={this.renderInput} label="Surname"/>
        <div id="userEmail">Your email:
           <span> {this.props.userData.email}</span>
        </div>
        <Field name="newEmail" component={this.renderInput} label="New Email"/>
        <button id="submit" className="submit">Submit</button>
      </form>
      </div>
    );
  }
}


export default reduxForm({ form: 'editProfile' })(EditProfileForm)
