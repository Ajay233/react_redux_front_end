import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { addAnswer } from '../actions'

class NewAnswerForm extends React.Component {

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

  renderSelect = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <div>
          <select {...formProps.input} className="inputBox select-medium">
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

  onSubmit = ({ answerIndex, description, correct }) => {
    const { currentQuestion, userData, addAnswer } = this.props
    const data = {
      questionId: currentQuestion.id,
      answerIndex: answerIndex,
      description: description,
      correctAnswer: correct
    }
    addAnswer(data, userData.jwt);
  }

  render(){
    return(
      <div className="componentContainer">
        <div className="title-large-spaced">Create an Answer</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-centered" data-testid="new-answer-form">
          <Field name="answerIndex" component={this.renderInput} label="Answer index:"/>
          <Field name="description" component={this.renderTextArea} label="Answer description"/>
          <Field name="correct" component={this.renderSelect} label="Correct? Yes/No:">
            <option value="" disabled>Select an option</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Field>
          <div className="buttonGroup">
            <button className="submit">Save</button><Link to="/editQuestion" className="cancel">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { answerIndex, description, correct } = formValues
  const errors = {}

  if(!answerIndex){
    errors.answerIndex = "This field must not be left empty"
  } else if(!isNaN(answerIndex)){
    errors.answerIndex = "This should be a single letter e.g. A, B, C, D or E"
  } else if(answerIndex.length > 1){
    errors.answerIndex = "This should be a single letter e.g. A, B, C, D or E"
  }

  if(!description){
    errors.description = "The answer description must not be empty"
  }

  if(correct !== false && correct !== true && correct !== 'false' && correct !== 'true'){
    errors.correct = "The answer must be marked as right of wrong"
  }

  return errors
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    currentQuestion: state.currentQuestion
  }
}

export default connect(mapStateToProps, { addAnswer })(reduxForm({ form: 'newAnswer', validate: validate })(NewAnswerForm))
