import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import history from '../history'

import { sessionExpired } from '../utils/session'
import { put } from '../axiosRequests/requests'

import { setNotification } from '../notifications/actions'
import { setCurrentAnswer, updateAnswer } from '../answer/actions'

class UpdateAnswerForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    );
  }

  renderSelect = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <select {...formProps.input} className="inputBox">
          {formProps.children}
        </select>
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  onSubmit = ({ number, description, correct }) => {
    const { currentAnswer, userData, setNotification, setCurrentAnswer, updateAnswer } = this.props
    const body = {
      id: currentAnswer.id,
      questionId: currentAnswer.questionId,
      answerNumber: number,
      description: description,
      correctAnswer: correct
    }
    put("answer/update", [body], userData.jwt).then((response) => {
      setCurrentAnswer(response.data[0]);
      updateAnswer(response.data[0]);
      history.push("/editQuestion");
      setNotification("Answer updated", "success", true);
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        setNotification("Error - unable to update answer", "error", true);
      }
    });
  }

  render(){
    return(
      <div>
        <div className="title-large">{`Edit Answer ${this.props.currentAnswer.answerNumber}`}</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="number" component={this.renderInput} label="Answer number:"/>
          <Field name="description" component={this.renderInput} label="Answer description"/>
          <Field name="correct" component={this.renderSelect} label="Correct? Yes/No:">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Field>
          <button className="submit">Save</button><Link className="cancel" to="/editQuestion">Cancel</Link>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { number, description, correct } = formValues
  const errors = {}

  if(!number){
    errors.number = "The answer number must not be empty"
  } else if(isNaN(number)){
    errors.number = "Only numbers are valid for the answer number"
  }

  if(!description){
    errors.description = "The answer description must not be empty"
  }

  if(typeof correct !== 'boolean' ){
    errors.correct = "The answer must be marked as right of wrong"
  }

  return errors
}

const mapStateToProps = (state) => {
  return {
    initialValues: {
      number: state.currentAnswer.answerNumber,
      description: state.currentAnswer.description,
      correct: state.currentAnswer.correctAnswer
    },
    userData: state.userData,
    currentAnswer: state.currentAnswer
  }
}

export default connect(mapStateToProps,
  { setNotification,
    setCurrentAnswer,
    updateAnswer
  })(reduxForm({ form: 'updateAnswer', validate: validate })(UpdateAnswerForm))
