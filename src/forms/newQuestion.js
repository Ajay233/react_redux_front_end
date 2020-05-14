import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { post } from '../axiosRequests/requests'
import history from '../history'
import { setNotification } from '../notifications/actions'
import { addQuestion } from '../question/actions'
import { sessionExpired } from '../utils/session'

class NewQuestionForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  onSubmit = ({ number, description }) => {
    const { userData, quiz, setNotification, addQuestion } = this.props;
    const body = {
      quizId: quiz.id,
      questionNumber: number,
      description: description
    }
    post("question/create", [body], userData.jwt).then((response) => {
      addQuestion(response.data[0]);
      history.push("/editQuiz");
      setNotification("Question created", "success", true);
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        console.log(error.response);
        setNotification("Error - unable to create question with the details provided", "error", true)
      }
    });
  }

  render(){
    return(
      <div className="componentContainer">
        <div className="title-large">Create a Question</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="number" component={this.renderInput} label="Question Number:"/>
          <Field name="description" component={this.renderInput} label="Question description:"/>
          <button className="submit">Save</button><Link to="/editQuiz" className="cancel">Cancel</Link>
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

export default connect(mapStateToProps, { setNotification, addQuestion })(reduxForm({ form: 'questionForm', validate: validate })(NewQuestionForm))
