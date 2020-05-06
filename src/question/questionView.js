import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Answers from '../answer/answers'
import UpdateQuestionForm from '../forms/updateQuestion'
import Notification from '../notifications/notifications'
import Modal from '../modal/modal'
import history from '../history'

import { setNotification } from '../notifications/actions'
import { hideModal, showModal2 } from '../modal/actions'
import { deleteAnswer } from '../answer/actions'
import { deleteQuestion } from '../question/actions'
import { del } from '../axiosRequests/requests'

import '../stylesheets/question.css'
import '../stylesheets/answer.css'

class QuestionView extends React.Component {

  renderAnswers = () => {
    const { answers } = this.props;
    return answers.length === 0 ? null : <Answers answers={answers} />
  }

  renderDetails = () => {
    const { currentQuestion, quiz } = this.props
    return(
      <React.Fragment>
        <div>{`Question number ${currentQuestion.questionNumber} from the ${quiz.name} quiz`}</div>
        <div>Question description:</div>
        <div>{ currentQuestion.description }</div>
      </React.Fragment>
    );
  }

  renderFormOrDetails = () => {
    return history.location.pathname === "/editQuestion" ? <UpdateQuestionForm/> : this.renderDetails();
  }

  handleDeleteAnswer = () => {
    const { currentAnswer, userData, setNotification, deleteAnswer } = this.props;
    const config = {
      data: [currentAnswer]
    }
    del("answer/delete", config, userData.jwt).then((response) => {
      deleteAnswer(currentAnswer);
      setNotification("Answer deleted", "success", true);
    }).catch((error) => {
      console.log(error.response);
      setNotification("Error - Unable to delete this answer", "error", true)
    });
  }

  handleDeleteQuestion = () => {
    const { currentQuestion, userData, setNotification, deleteQuestion } = this.props;
    const config = {
      data: [currentQuestion]
    }
    del("question/delete", config, userData.jwt).then((response) => {
      deleteQuestion(currentQuestion);
      history.push("/editQuiz")
      setNotification("Question deleted", "success", true);
    }).catch((error) => {
      console.log(error.response);
      setNotification("Error - Unable to delete this question", "error", true)
    });
  }

  renderAddButton = () => {
    return <Link to="/newAnswer" className="add"><i className="fas fa-plus-circle green"></i> Add an answer</Link>
  }

  triggerModal = () => {
    this.props.showModal2()
  }

  renderDeleteButton = () => {
    return <button onClick={this.triggerModal} className="delete"><i class="fas fa-trash-alt"></i> Delete</button>
  }

  renderOptions = () => {
    const { permission } = this.props.userData
    return permission === "ADMIN" ? <div>{this.renderAddButton()}{this.renderDeleteButton()}</div> : null
  }

  render(){
    const { currentAnswer, modalState, hideModal, currentQuestion } = this.props
    return(
      <div id="questionView">
        <Modal
          show={modalState.showModal}
          title={"Answer"}
          message={`You are about to delete answer ${currentAnswer.answerNumber}`}
          onDelete={this.handleDeleteAnswer}
          onCancel={hideModal}
        />
        <Modal
          show={modalState.showModal2}
          title={"Question"}
          message={`You are about to delete question ${currentQuestion.questionNumber}, this will also delete any associated answers for this question.`}
          onDelete={this.handleDeleteQuestion}
          onCancel={hideModal}
        />
        <Notification />
        {this.renderFormOrDetails()}
        {this.renderOptions()}
        <div id="answersTitle">Answers</div>
        <div id="answerHeadings">
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

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quiz: state.quiz,
    currentQuestion: state.currentQuestion,
    answers: state.answers,
    currentAnswer: state.currentAnswer,
    modalState: state.showModal
  }
}

export default connect(mapStateToProps, { setNotification, hideModal, deleteAnswer, deleteQuestion, showModal2 })(QuestionView)
