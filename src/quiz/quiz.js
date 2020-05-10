import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Notification from '../notifications/notifications'
import Questions from '../question/questions'
import UpdateQuizForm from '../forms/updateQuiz'
import Modal from '../modal/modal'
import { getQuestions, deleteQuestion } from '../question/actions'
import { setNotification } from '../notifications/actions'
import { deleteQuiz } from '../quizSearch/actions'
import { setQuiz, updateQuizStatus } from './actions'
import { hideModal, showModal2 } from '../modal/actions'
import { del } from '../axiosRequests/requests'
import history from '../history'

import '../stylesheets/quiz.css'

class Quiz extends React.Component {

  handleDeleteQuestion = () => {
    const { currentQuestion, userData, setNotification, deleteQuestion, hideModal } = this.props;
    const config = {
      data: [currentQuestion]
    }
    del("question/delete", config, userData.jwt).then((response) => {
      hideModal()
      deleteQuestion(currentQuestion);
      setNotification("Question deleted", "success", true);
    }).catch((error) => {
      console.log(error.response);
      hideModal()
      setNotification("Error - Unable to delete this question", "error", true)
    });
  }

  handleDeleteQuiz = () => {
    const { quiz, userData, deleteQuiz, setNotification } = this.props;
    const config = {
      data: quiz
    }
    del("quiz/delete", config, userData.jwt).then((response) => {
      hideModal()
      deleteQuiz(quiz)
      history.push("/quizSearch")
      setNotification("Quiz deleted", "success", true)
    }).catch((error) => {
      console.log(error.response)
      hideModal()
      setNotification("Error - Unable to delete this quiz", "error", true)
    })
  }

  renderDetails = () => {
    const { name, description } = this.props.quiz
    return(
      <React.Fragment>
        <div id="quizTitle">{name}</div>
        <div className="quizStatus">Status: {this.renderStatus()}</div>
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
        <div className="quizStatus">Status: {this.renderStatus()}</div>
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
    return permission === "ADMIN" ? <Link to="/newQuestion" className="add addButton"><i className="fas fa-plus-circle green"></i> Add a question</Link> : null
  }

  triggerModal = () => {
    this.props.showModal2()
  }

  renderDeleteButton = () => {
    return <button onClick={this.triggerModal} className="delete"><i class="fas fa-trash-alt"></i> Delete</button>
  }

  renderStatusButton = () => {
    const { quiz } = this.props;
    return( <button className={quiz.status === "DRAFT" ? "save" : "warningButton"} onClick={this.updateStatus}>
              { quiz.status === "DRAFT" ? <i className="far fa-check-circle"></i> : <i className="fas fa-pencil-ruler"></i>}
              { quiz.status === "DRAFT" ? " Mark as Ready" : " Revert to draft" }
            </button>
    );
  }

  updateStatus = () => {
    const { quiz, updateQuizStatus, userData } = this.props;
    const data = {
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
      category: quiz.category,
      status: quiz.status === "DRAFT" ? "READY" : "DRAFT"
    }
    updateQuizStatus(data, userData.jwt)
  }

  renderStatus = () => {
    const { quiz } = this.props;
    return quiz.status === "DRAFT" ? <span className="draftFlag"><i className="fas fa-pencil-ruler"></i> Currenty in Draft</span> : <span className="readyFlag"><i className="far fa-check-circle"></i> Ready for use</span>
  }

  renderOptions = () => {
    const { permission } = this.props.userData
    return permission === "ADMIN" ? <div>{this.renderDeleteButton()}{this.renderStatusButton()}</div> : null
  }



  render(){
    const { questions, currentQuestion, hideModal, modalState } = this.props
    return(
      <div id="quiz">
        <Modal
          show={modalState.showModal}
          title={"Question"}
          message={`You are about to delete question ${currentQuestion.questionNumber}, this will also delete any associated answers for this question.`}
          onDelete={this.handleDeleteQuestion}
          onCancel={hideModal}
        />
        <Modal
          show={modalState.showModal2}
          title={"Quiz"}
          message={"You are about to delete a quiz which will also delete any questions and answers associated with this"}
          onDelete={this.handleDeleteQuiz}
          onCancel={hideModal}
        />
        <Notification />
        {this.renderDetailsOrUpdate()}
        {this.renderOptions()}
        <div className="headerContainer">
          <div id="questionsTitle">Questions</div>
          {this.renderAddButton()}
        </div>
        <div id="questionHeadings">
          <div id="questionNumberHeader">Answer</div>
          <div id="questionDescriptionHeader">Description</div>
          <div id="questionOptionsHeader"></div>
        </div>
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

export default connect(mapStateToProps,
  { getQuestions,
    setQuiz,
    setNotification,
    hideModal,
    deleteQuestion,
    deleteQuiz,
    showModal2,
    updateQuizStatus
  })(Quiz)
