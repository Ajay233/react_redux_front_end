import React from 'react'
import { connect } from 'react-redux'
import Answers from '../answer/answers'
import UpdateQuestionForm from '../forms/updateQuestion'
import Notification from '../notifications/notifications'
import Modal from '../modal/modal'

import { setNotification } from '../notifications/actions'
import { hideModal } from '../modal/actions'
import { deleteAnswer } from '../answer/actions'

import { del } from '../axiosRequests/requests'

import '../stylesheets/question.css'
import '../stylesheets/answer.css'

class QuestionView extends React.Component {

  renderAnswers = () => {
    const { answers } = this.props;
    return answers.length === 0 ? null : <Answers answers={answers} />
  }

  handleDelete = () => {
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

  render(){
    const { questionNumber, description } = this.props.currentQuestion
    const { currentAnswer, modalState, hideModal } = this.props
    return(
      <div id="questionView">
        <Modal
          show={modalState}
          title={"Answer"}
          message={`You are about to delete answer ${currentAnswer.answerNumber}`}
          onDelete={this.handleDelete}
          onCancel={hideModal}
        />
        <Notification />
        <div>{`Question number ${questionNumber} from the ${this.props.quiz.name} quiz`}</div>
        <div>{ description }</div>
        <UpdateQuestionForm />
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

export default connect(mapStateToProps, { setNotification, hideModal, deleteAnswer })(QuestionView)
