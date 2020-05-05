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

import '../stylesheets/quiz.css'

class Quiz extends React.Component {

  // componentWillMount(){
  //   const { userData, quiz, getQuestions } = this.props
  //   const param = { quizId: quiz.id }
  //   getQuestions("question/findByQuizId", param, userData.jwt)
  // }

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

  renderQuestions = () => {
    const { questions } = this.props;
    return questions.length === 0 ? null : <Questions questions={questions}/>
  }

  render(){
    const { name, description } = this.props.quiz
    return(
      <div id="quiz">
        <Modal
          show={this.props.modalState}
          title={"Question"}
          message={`You are about to delete question ${this.props.currentQuestion.questionNumber}, this will also delete any associated answers for this question.`}
          onDelete={this.handleDelete}
          onCancel={this.props.hideModal}
        />
        <Notification />
        <div id="quizTitle">{name}</div>
        <div>Description:</div>
        <div>{description}</div>
        <UpdateQuizForm
          setNotification={this.props.setNotification}
          setQuiz={this.props.setQuiz}
          jwt={this.props.userData.jwt}
          quiz={this.props.quiz}
        />
        <div id="questionsTitle">Questions:</div>
        <Questions questions={this.props.questions}/>
        <Link to="/newQuestion"><i className="fas fa-plus-circle green"></i>Add a question</Link>
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
