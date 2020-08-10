import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { setNotification } from '../notifications/actions'
import { setQuiz } from '../quiz/actions'

import { put } from '../axiosRequests/requests'
import { sessionExpired } from '../utils/session'


// pass in setNotification, setQuiz, jwt, quiz

class UpdateQuizForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name)} className="inputBox"/>
      </div>
    )
  }

  renderTextArea = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <textarea {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name)} className="inputBox"/>
      </div>
    )
  }

  renderSelect = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <div>
          <select {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name)} className="inputBox select-medium">
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

  renderPlaceholder = (inputName) => {
    const {name, description, category} = this.props.quiz
    switch(inputName){
      case 'name': return name;
      case 'description': return description;
      case 'category': return category;
      default: return null;
    }
  }

  renderOptions = () => {
    const { categories } = this.props.lists
    let listOfOptions = categories.map(category => {
      return <option key={categories.indexOf(category)} value={category}>{category}</option>
    })
    return listOfOptions
  }

  onSubmit = ({ name, description, category }) => {
    const { userData, quiz, setQuiz, setNotification } = this.props;
    const body = {
      id: quiz.id,
      name: name,
      description: description,
      category: category,
      status: quiz.status
    }
    put("quiz/update", body, userData.jwt).then((response) => {
      setQuiz(response.data);
      setNotification("Quiz updated", "success", true);
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        setNotification("Error - Unable to update quiz", "error", true);
      }
    })
  }

  renderStatusButton = () => {
    const { quiz } = this.props;
    return( <button data-testid="updateStatus-button" className={quiz.status === "DRAFT" ? "save" : "warningButton"} onClick={this.props.updateStatus}>
              { quiz.status === "DRAFT" ? <i className="far fa-check-circle"></i> : <i className="fas fa-pencil-ruler"></i>}
              { quiz.status === "DRAFT" ? " Mark as Ready" : " Revert to draft" }
            </button>
    );
  }

  // <option value="" disabled>{this.props.quiz.category}</option>

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-centered">
          <Field name="name" component={this.renderInput} label="Quiz name:"/>
          <Field name="description" component={this.renderTextArea} label="Quiz description:"/>
          <Field name="category" component={this.renderSelect} label="Quiz category:">
            {this.renderOptions()}
          </Field>
          <div className="buttonGroup">
            <button className="submit"><i className="far fa-save"></i> Save Changes</button>
            <button
              data-testid="delete-quiz-button"
              onClick={this.props.triggerModal}
              className="delete"
            >
              <i className="fas fa-trash-alt"></i> Delete Quiz
            </button>
            {this.renderStatusButton()}
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { name, description, category } = formValues
  const errors = {}
   if(!name){
     errors.name = "Quiz name must not be empty"
   }

   if(!description){
     errors.description = "Quiz description must not be empty"
   }

   if(!category){
     errors.description = "Quiz category must be selected"
   }
   return errors
}

const mapStateToProps = (state) => {
  return {
    initialValues: {
      name: state.quiz.name,
      description: state.quiz.description,
      category: state.quiz.category
    },
    userData: state.userData,
    quiz: state.quiz,
    lists: state.lists
  }
}

export default connect(mapStateToProps, { setQuiz, setNotification })(reduxForm({ form: 'editQuizForm', validate: validate })(UpdateQuizForm))
