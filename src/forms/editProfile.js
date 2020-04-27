import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { post } from '../axiosRequests/requests'
// import { connect } from 'react-redux'

import '../stylesheets/inputs.css';
import '../stylesheets/buttons.css';
import '../stylesheets/editProfile.css';


class EditProfile extends React.Component {

  // TODO:
  // Create a container class called editProfile
  // Change this to be EditProfileForm
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
      case 'forename': return forename; break;
      case 'surname': return surname; break;
      default: return email;
    }
  }

  validateNewEmail = (email1, email2) => {
    return email1 ? email1 : email2
  }

  // We don't need event.preventDefault() because redux-form handles that for us
  onSubmit = ({forename, surname, newEmail}) => {
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
    post('users/update', data, jwt).then((response) => {
      console.log("Edited")
    }).catch((error) => {
      console.log(error.config)
    });
  }

  // Chack if changing the label will break anything

  render(){
    return(
      <div id="editUserDetails">
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="profileForm">
        <div>
        <img src={require('../public/icons/id.png')} id="idImg"/>
        <div id="editProfileTitle">Edit Profile</div>
        </div>
        <Field className="inputBox" name="forename" component={this.renderInput} label="Forename"/>
        <Field className="inputBox" name="surname" component={this.renderInput} label="Surname"/>
        <div id="userEmail">Your email:
           <span> {this.props.userData.email}</span>
        </div>
        <Field className="inputBox" name="newEmail" component={this.renderInput} label="New Email"/>
        <button id="submit" className="submit">Submit</button>
      </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     userData: state.userData
//   }
// }

export default reduxForm({ form: 'editProfile' })(EditProfile)
