import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Notification from '../notifications/notifications'
import Questions from '../question/questions'
import UpdateQuizForm from '../forms/updateQuiz'
import Modal from '../modal/modal'
import { getQuestions, deleteQuestion } from '../question/actions'
import { setNotification } from '../notifications/actions'
import { setQuiz } from './actions'
import { hideModal } from '../modal/actions'
import { del } from '../axiosRequests/requests'
import history from '../history'

import '../stylesheets/quiz.css'

class Quiz extends React.Component {

  handleDelete = () => {
    const { currentQuestion, userData, setNotification, deleteQuestion } = this.props;
    const config = {
      data: [currentQuestion]
    }
    del("question/delete", config, userData.jwt).then((response) => {
      deleteQuestion(currentQuestion);
      setNotification("Question deleted", "success", true);
    }).catch((error) => {
      console.log(error.response);
      setNotification("Error - Unable to delete this question", "error", true)
    });
  }

  renderDetails = () => {
    const { name, description } = this.props.quiz
    return(
      <React.Fragment>
        <div id="quizTitle">{name}</div>
        <div>Description:</div>
        <div>{description}</div>
      </React.Fragment>
    );
  }

  renderUpdateForm = () => {
    const { name } = this.props.quiz
    return(
      <React.Fragment>
        <div id="quizTitle">{`Edit the ${name} quiz`}</div>
        <UpdateQuizForm />
      </React.Fragment>
    );
  }

  renderDetailsOrUpdate = () => {
    return history.location.pathname === "/editQuiz" ? this.renderUpdateForm() : this.renderDetails()
  }

  renderQuestions = () => {
    const { questions } = this.props;
    return questions.length === 0 ? null : <Questions questions={questions}/>
  }

  renderAddButton = () => {
    const { permission } = this.props.userData
    return permission === "ADMIN" ? <Link to="/newQuestion"><i className="fas fa-plus-circle green"></i> Add a question</Link> : null
  }

  render(){
    const { questions, currentQuestion, hideModal, modalState } = this.props
    return(
      <div id="quiz">
        <Modal
          show={modalState}
          title={"Question"}
          message={`You are about to delete question ${currentQuestion.questionNumber}, this will also delete any associated answers for this question.`}
          onDelete={this.handleDelete}
          onCancel={hideModal}
        />
        <Notification />
        {this.renderDetailsOrUpdate()}
        {this.renderAddButton()}
        <div id="questionsTitle">Questions:</div>
        <Questions questions={questions}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quiz: state.quiz,
    questions: state.questions,
    currentQuestion: state.currentQuestion,
    modalState: state.showModal
  }
}

export default connect(mapStateToProps, { getQuestions, setQuiz, setNotification, hideModal, deleteQuestion })(Quiz)
