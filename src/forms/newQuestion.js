import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { post } from '../axiosRequests/requests'
import history from '../history'
import { setNotification } from '../notifications/actions'
import { addQuestion } from '../question/actions'

class NewQuestionForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        <label>{ formProps.label }</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    );
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
      console.log(error.response);
      setNotification("Error - unable to create question with the details provided", "error", true)
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

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    currentQuestion: state.currentQuestion,
    quiz: state.quiz
  }
}

export default connect(mapStateToProps, { setNotification, addQuestion })(reduxForm({ form: 'questionForm' })(NewQuestionForm))
