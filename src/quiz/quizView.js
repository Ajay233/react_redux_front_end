import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Notification from '../notifications/notifications'
import Questions from '../question/questions'
import UpdateQuizForm from '../forms/updateQuiz'
import Modal from '../modal/modal'
import { getQuestions, deleteQuestion, setCurrentQuestion } from '../question/actions'
import { setNotification } from '../notifications/actions'
import { deleteQuiz } from '../quizSearch/actions'
import { getAnswers } from '../answer/actions'
import { setQuiz, updateQuizStatus } from './actions'
import { hideModal, showModal2, showModal } from '../modal/actions'
import { del } from '../axiosRequests/requests'
import { sessionExpired } from '../utils/session'
import history from '../history'

import '../stylesheets/quiz.css'

export class QuizView extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  renderModal = () => {
    const { hideModal, currentQuestion } = this.props
    const { showModal, showModal2 } = this.props.modalState
    if(showModal === true){
      return(
        <Modal
          show={showModal}
          title={"Delete Question"}
          message={`You are about to delete question ${currentQuestion.questionNumber}, this will also delete any associated answers for this question.  Do you want to continue?`}
          onDelete={this.handleDeleteQuestion}
          onCancel={hideModal}
        />
      );
    } else if(showModal2 === true) {
      return (
        <Modal
          show={showModal2}
          title={"Delete Quiz"}
          message={"You are about to delete this quiz which will also delete any questions and answers associated with it.  Do you want to continue?"}
          onDelete={this.handleDeleteQuiz}
          onCancel={hideModal}
        />
      );
    } else {
      return null
    }
  }

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
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        hideModal()
        setNotification("Error - Unable to delete this question", "error", true)
      }
    });
  }

  handleDeleteQuiz = () => {
    const { quiz, userData, deleteQuiz, setNotification, hideModal } = this.props;
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
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        hideModal()
        setNotification("Error - Unable to delete this quiz", "error", true)
      }
    })
  }

  renderDetails = () => {
    const { name, description, category } = this.props.quiz
    return(
      <React.Fragment>
        <div id="quizTitle">{name}</div>
        <div className="quizStatus">Status: {this.renderStatus()}</div>
        <div className="detailsContainer">
          <div className="detailsHeading">Description:</div>
          <div className="detailsContent">{description}</div>
        </div>
        <div className="detailsContainer">
          <div className="detailsHeading">Category:</div>
          <div className="detailsContent">{category}</div>
        </div>
      </React.Fragment>
    );
  }

  renderUpdateForm = () => {
    const { name } = this.props.quiz
    return(
      <React.Fragment>
        <div id="quizTitle">{`Edit the ${name} ${name.includes("quiz") || name.includes("Quiz") ? "" : "quiz"}`}</div>
        <div className="quizStatusBadge">Status: {this.renderStatus()}</div>
        <UpdateQuizForm triggerModal={this.triggerModal} updateStatus={this.updateStatus}/>
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

  clearNotification = () => {
    const { setNotification } = this.props
    setNotification()
  }

  renderAddButton = () => {
    const { permission } = this.props.userData
    return permission === "ADMIN" || permission === "SUPER-USER" ? <Link to="/newQuestion" className="addButton linkStandard" onClick={this.clearNotification}><i className="fas fa-plus-circle green"></i> Add a question</Link> : null
  }

  triggerModal = (event) => {
    event.preventDefault()
    this.props.showModal2()
  }

  // renderDeleteButton = () => {
  //   return <button data-testid="delete-quiz-button" onClick={this.triggerModal} className="delete"><i className="fas fa-trash-alt"></i> Delete</button>
  // }
  //
  // renderStatusButton = () => {
  //   const { quiz } = this.props;
  //   return( <button data-testid="updateStatus-button" className={quiz.status === "DRAFT" ? "save" : "warningButton"} onClick={this.updateStatus}>
  //             { quiz.status === "DRAFT" ? <i className="far fa-check-circle"></i> : <i className="fas fa-pencil-ruler"></i>}
  //             { quiz.status === "DRAFT" ? " Mark as Ready" : " Revert to draft" }
  //           </button>
  //   );
  // }

  updateStatus = (event) => {
    event.preventDefault()
    const { quiz, updateQuizStatus, userData } = this.props;
    const data = {
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
      category: quiz.category,
      status: quiz.status === "DRAFT" ? "READY" : "DRAFT"
    }
    updateQuizStatus("quiz/updateStatus", data, userData.jwt)
  }

  renderStatus = () => {
    const { quiz } = this.props;
    return quiz.status === "DRAFT" ? <span className="draftFlag"><i className="fas fa-pencil-ruler"></i> Currenty in Draft</span> : <span className="readyFlag"><i className="far fa-check-circle"></i> Ready for use</span>
  }

  renderOptions = () => {
    const { permission } = this.props.userData
    return permission === "ADMIN" ? <div>{this.renderStatusButton()}</div> : null
  }

  renderQuestions = () => {
    const { questions, showModal, userData, getAnswers, setCurrentQuestion, deleteQuestion, setNotification } = this.props
    return( questions.length === 0 ? null :
      <Questions
        questions={questions}
        userData={userData}
        getAnswers={getAnswers}
        setCurrentQuestion={setCurrentQuestion}
        setNotification={setNotification}
        deleteQuestion={deleteQuestion}
        showModal={showModal}
      />
    );
  }



  render(){
    return(
      <div id="quiz" className="componentContainer">
        {this.renderModal()}
        <Link className="link back" to="/quizSearch" onClick={this.clearNotification}><i className="fas fa-chevron-circle-left blue"></i> Back</Link>
        <Notification />
        {this.renderDetailsOrUpdate()}
        <div className="headerContainer">
          <div id="questionsTitle">Questions</div>
          {this.renderAddButton()}
        </div>
        <div id="questionHeadings" className="questionHeadings">
          <div id="questionNumberHeader">Answer</div>
          <div id="questionDescriptionHeader">Description</div>
          <div id="questionOptionsHeader"></div>
        </div>
        {this.renderQuestions()}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quiz: state.quiz,
    questions: state.questions,
    currentQuestion: state.currentQuestion,
    modalState: state.modalState,
    lists: state.lists
  }
}

export default connect(mapStateToProps,
  { getQuestions,
    setCurrentQuestion,
    setQuiz,
    setNotification,
    hideModal,
    deleteQuestion,
    deleteQuiz,
    showModal,
    showModal2,
    updateQuizStatus,
    getAnswers
  })(QuizView)
