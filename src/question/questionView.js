import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Answers } from '../answer/answers'
import UpdateQuestionForm from '../forms/updateQuestion'
import Notification from '../notifications/notifications'
import Modal from '../modal/modal'
import history from '../history'

import { setNotification } from '../notifications/actions'
import { hideModal, showModal, showModal2 } from '../modal/actions'
import { setCurrentAnswer, deleteAnswer } from '../answer/actions'
import { deleteQuestion } from '../question/actions'
import { del } from '../axiosRequests/requests'
import { sessionExpired } from '../utils/session'

import '../stylesheets/question.css'
import '../stylesheets/answer.css'

export class QuestionView extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  renderModal = () => {
    const { currentAnswer, hideModal, currentQuestion } = this.props
    const { showModal, showModal2 } = this.props.modalState
    if(showModal === true){
      return(
        <Modal
          type={"delete"}
          show={showModal}
          title={"Delete Answer"}
          message={`You are about to delete answer ${currentAnswer.answerIndex}.  Do you want to continue?`}
          onDelete={this.handleDeleteAnswer}
          onCancel={hideModal}
        />
      );
    } else if(showModal2 === true){
      return(
        <Modal
          type={"delete"}
          show={showModal2}
          title={"Delete Question"}
          message={`You are about to delete question ${currentQuestion.questionNumber}, this will also delete any associated answers for this question.  Do you want to continue?`}
          onDelete={this.handleDeleteQuestion}
          onCancel={hideModal}
        />
      );
    } else {
      return null
    }
  }

  renderAnswers = () => {
    const { answers, userData, setCurrentAnswer, setNotification, deleteAnswer, showModal } = this.props;
    return answers.length === 0 ? null :
    <Answers
      answers={answers}
      userData={userData}
      setCurrentAnswer={setCurrentAnswer}
      setNotification={setNotification}
      deleteAnswer={deleteAnswer}
      showModal={showModal}
    />
  }

  renderDetails = () => {
    const { currentQuestion, quiz } = this.props
    return(
      <React.Fragment>
        <div className="title-large">{`Question number ${currentQuestion.questionNumber} from the ${quiz.name} quiz`}</div>
        <div className="detailsContainer">
          <div className="detailsHeading">Question description:</div>
          <div className="detailsContent">{ currentQuestion.description }</div>
        </div>
      </React.Fragment>
    );
  }

  renderFormOrDetails = () => {
    return history.location.pathname === "/editQuestion" ? <UpdateQuestionForm triggerModal={this.triggerModal}/> : this.renderDetails();
  }

  handleDeleteAnswer = () => {
    const { currentAnswer, userData, setNotification, deleteAnswer, hideModal } = this.props;
    const config = {
      data: [currentAnswer]
    }
    del("answer/delete", config, userData.jwt).then((response) => {
      hideModal()
      deleteAnswer(currentAnswer);
      setNotification("Answer deleted", "success", true);
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        hideModal()
        setNotification("Error - Unable to delete this answer", "error", true)
      }
    });
  }

  handleDeleteQuestion = () => {
    const { currentQuestion, userData, setNotification, deleteQuestion, hideModal } = this.props;
    const config = {
      data: [currentQuestion]
    }
    del("question/delete", config, userData.jwt).then((response) => {
      hideModal()
      deleteQuestion(currentQuestion);
      history.push("/editQuiz")
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

  clearNotification = () => {
    const { setNotification } = this.props
    setNotification()
  }

  renderAddButton = () => {
    const { permission } = this.props.userData
    return permission === "ADMIN" || permission === "SUPER-USER" ? <Link to="/newAnswer" className="addButton linkStandard" onClick={this.clearNotification}><i className="fas fa-plus-circle green"></i> Add an answer</Link> : null
  }

  triggerModal = (event) => {
    event.preventDefault()
    this.props.showModal2()
  }

  renderBackButton = () => {
    const { permission } = this.props.userData
    if(permission === "READ-ONLY"){
      return <Link to="/viewQuiz" className="link back" onClick={this.clearNotification}><i className="fas fa-chevron-circle-left blue"></i> Back</Link>
    } else {
      return <Link to="/editQuiz" className="link back" onClick={this.clearNotification}><i className="fas fa-chevron-circle-left blue"></i> Back</Link>
    }
  }

  // renderDeleteButton = () => {
  //   return <button data-testid="delete-question-button" onClick={this.triggerModal} className="delete"><i className="fas fa-trash-alt"></i> Delete</button>
  // }

  // renderOptions = () => {
  //   const { permission } = this.props.userData
  //   return permission === "ADMIN" ? <div>{this.renderDeleteButton()}</div> : null
  // }

  render(){
    return(
      <div id="questionView" className="componentContainer">
        {this.renderModal()}
        {this.renderBackButton()}
        <Notification />
        {this.renderFormOrDetails()}
        <div className="headerContainer">
          <div id="answersTitle">Answers</div>
          {this.renderAddButton()}
        </div>
        <div id="answerHeadings" className="answerHeadings">
          <div id="numberHeader">Answer</div>
          <div id="descriptionHeader">Description</div>
          <div id="correctAnswerHeading">Correct answer?</div>
          <div id="optionsHeader"></div>
        </div>
        <div id="answers">
          {this.renderAnswers()}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quiz: state.quiz,
    currentQuestion: state.currentQuestion,
    answers: state.answers,
    currentAnswer: state.currentAnswer,
    modalState: state.modalState
  }
}

export default connect(mapStateToProps,
  {
    setNotification,
    hideModal,
    deleteAnswer,
    setCurrentAnswer,
    deleteQuestion,
    showModal,
    showModal2
  })(QuestionView)
