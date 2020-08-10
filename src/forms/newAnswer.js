import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import history from '../history'

import { sessionExpired } from '../utils/session'
import { post } from '../axiosRequests/requests'

import { setNotification } from '../notifications/actions'
import { addAnswer } from '../answer/actions'

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

  onSubmit = ({ number, description, correct }) => {
    const { currentQuestion, userData, setNotification, addAnswer } = this.props
    const data = {
      questionId: currentQuestion.id,
      answerNumber: number,
      description: description,
      correctAnswer: correct
    }
    post("answer/create", [data], userData.jwt).then((response) => {
      addAnswer(response.data[0]);
      history.push("/editQuestion");
      setNotification("Answer created", "success", true);
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        console.log(error.response);
        setNotification("Error - unable to update answer", "error", true);
      }
    });
  }

  render(){
    return(
      <div className="componentContainer">
        <div className="title-large-spaced">Create an Answer</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-centered">
          <Field name="number" component={this.renderInput} label="Answer number:"/>
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
  const { number, description, correct } = formValues
  const errors = {}
  const regex = /^\d+$/g

  if(!number){
    errors.number = "The answer number must not be empty"
  } else if(!number.match(regex)){
    errors.number = "Only numbers are valid for the answer number"
  }

  if(!description){
    errors.description = "The answer description must not be empty"
  }

  if(!correct){
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

export default connect(mapStateToProps, { setNotification, addAnswer })(reduxForm({ form: 'updateAnswer', validate: validate })(NewAnswerForm))
