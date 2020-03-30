import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { post } from '../axiosRequests/requests'
// import { connect } from 'react-redux'

class EditProfile extends React.Component {

  // formProps is always passed into the method you use in the Field 'component' attribute
  renderInput = (formProps) => {
    return(
      <div>
        <label>{formProps.label}</label>
        <input {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name)}/>
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

  render(){
    return(
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="forename" component={this.renderInput} label="Forename"/>
        <Field name="surname" component={this.renderInput} label="Surname"/>
        <div>Email: <span>{this.props.userData.email}</span></div>
        <Field name="newEmail" component={this.renderInput} label="New Email"/>
        <button>Submit</button>
      </form>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     userData: state.userData
//   }
// }

export default reduxForm({ form: 'editProfile' })(EditProfile)
