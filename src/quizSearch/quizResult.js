import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { setQuiz } from '../quiz/actions'
import { setNotification } from '../notifications/actions'
import { deleteQuiz } from './actions'
import { showModal, showModal2 } from '../modal/actions'
import { getQuestions, setCurrentQuestion } from '../question/actions'
import { getAnswers } from '../answer/actions'


export class QuizResult extends React.Component {

  handleDelete = () => {
    this.props.setQuiz(this.props.quiz);
    this.props.showModal();
  }

  handleView = () => {
    const { userData, quiz, getQuestions, setQuiz, setNotification, clearQuizes } = this.props
    const param = { quizId: quiz.id }
    setNotification()
    clearQuizes()
    getQuestions("question/findByQuizId", param, userData.jwt)
    setQuiz(quiz);
  }

  // if questions.length is not greater than 0, setNotification or use modal
  // handleStart = () => {
    // const { userData, quiz, getQuestions, getAnswers, setCurrentQuestion, setQuiz } = this.props
    // const param = { quizId: quiz.id }
    // getQuestions("question/findByQuizId", param, userData.jwt, true, getAnswers, setCurrentQuestion)
    // setQuiz(quiz);
    // history.push("/startQuiz")
  // }

  handleStart = () => {
    const { quiz, setQuiz, showModal2 } = this.props
    setQuiz(quiz);
    showModal2();
  }

  renderQuiz = () => {
    const { name, description, status } = this.props.quiz
    const { permission } = this.props;
    return(
      <div className="quiz">
        <div className={permission !== "USER" ? "quizName" : "quizNameExpanded"}>{name}</div>
        <div className="quizDescription">{description}</div>
        { permission !== "USER" ? <div className="quizStatus">{status}</div> : null }
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions = () => {
    const { permission } = this.props;
    const { status } = this.props.quiz
    return(
      <div className="options">
        { permission === "ADMIN" || permission === "SUPER-USER" ? <Link to="#" className="deleteOption linkStandard" onClick={this.handleDelete}><i className="fas fa-trash-alt red"></i> Delete</Link> : null }
        { permission === "READ-ONLY" ? <Link to="/viewQuiz" className="view" onClick={this.handleView}><i className="far fa-eye blue"></i> View</Link> : null }
        { permission === "ADMIN" || permission === "SUPER-USER" ? <Link to="/editQuiz" className="edit linkStandard" onClick={this.handleView}><i className="fas fa-edit blue"></i> Edit</Link> : null }
        { status === "READY" ? <Link to="#" className="start linkStandard" onClick={this.handleStart}><i className="far fa-play-circle blue"></i> Start</Link> : null }
      </div>
    );
  }

  render(){
    return(
      <div className="quizContainer">
        {this.renderQuiz()}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    modalState: state.modalState
  }
}

export default connect(mapStateToProps,
  { setQuiz,
    setNotification,
    deleteQuiz,
    showModal,
    showModal2,
    getQuestions,
    getAnswers,
    setCurrentQuestion
  })(QuizResult)
