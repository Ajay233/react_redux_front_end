import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { setNotification } from '../notifications/actions'
import { setQuiz } from '../quiz/actions'

import { put } from '../axiosRequests/requests'



// pass in setNotification, setQuiz, jwt, quiz

class UpdateQuizForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        <label>{ formProps.label }</label>
        <input {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name)} className="inputBox"/>
      </div>
    )
  }

  renderSelect = (formProps) => {
    return(
      <div>
        <label>{ formProps.label }</label>
        <select {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name)} className="inputBox">
          {formProps.children}
        </select>
      </div>
    );
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



  onSubmit = ({ name, description, category }) => {
    const { userData, quiz, setQuiz, setNotification } = this.props;
    const body = {
      id: quiz.id,
      name: name,
      description: description,
      category: category
    }
    put("quiz/update", body, userData.jwt).then((response) => {
      setQuiz(body);
      setNotification("Quiz updated", "success", true);
    }).catch((error) => {
      console.log(error.response);
      this.props.setNotification("Error - Unable to update quiz", "error", true);
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="name" component={this.renderInput} label="Quiz name:"/>
          <Field name="description" component={this.renderInput} label="Quiz description:"/>
          <Field name="category" component={this.renderSelect} label="Quiz category:">
            <option value="Comics">Comics</option>
            <option value="type1">type1</option>
            <option value="type2">type2</option>
            <option value="type3">type3</option>
          </Field>
          <div>
            <button className="submit">Save</button>
            <Link className="cancel" to="/quizSearch">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    initialValues: {
      name: state.quiz.name,
      description: state.quiz.description,
      category: state.quiz.category
    },
    userData: state.userData,
    quiz: state.quiz
  }
}

export default connect(mapStateToProps, { setQuiz, setNotification })(reduxForm({ form: 'quizForm' })(UpdateQuizForm))
