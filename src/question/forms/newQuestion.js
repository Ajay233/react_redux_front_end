import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { addQuestion } from '../actions'

class NewQuestionForm extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    );
  }

  renderTextArea = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <textarea {...formProps.input} className="inputBox"/>
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  onSubmit = ({ number, description }) => {
    const { userData, quiz, addQuestion } = this.props;
    const body = {
      quizId: quiz.id,
      questionNumber: number,
      description: description
    }
    addQuestion(body, userData.jwt)
  }

  render(){
    return(
      <div className="componentContainer">
        <div className="title-large-spaced">Create a Question</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-centered">
          <Field name="number" component={this.renderInput} label="Question Number:"/>
          <Field name="description" component={this.renderTextArea} label="Question description:"/>
          <div className="buttonGroup">
            <button className="submit">Save</button><Link to="/editQuiz" className="cancel">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { number, description } = formValues
  const errors = {}
  const regex = /^\d+$/g

  if(!number){
    errors.number = "The question number must not be empty"
  } else if (!number.match(regex)){
    errors.number = "Only numbers are valid for the question number"
  }

  if(!description){
    errors.description = "The question description must not be left empty"
  }

  return errors

}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    currentQuestion: state.currentQuestion,
    quiz: state.quiz
  }
}

export default connect(mapStateToProps,
  { addQuestion
  })(reduxForm({ form: 'questionForm', validate: validate })(NewQuestionForm))
