import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { setQuiz } from '../quiz/actions'
import { setNotification } from '../notifications/actions'
import { deleteQuiz } from './actions'
import { showModal } from '../modal/actions'
import { getQuestions } from '../question/actions'

class QuizResult extends React.Component {

  handleDelete = () => {
    this.props.setQuiz(this.props.quiz);
    this.props.showModal();
  }

  handleView = () => {
    const { userData, quiz, getQuestions, setQuiz } = this.props
    const param = { quizId: quiz.id }
    getQuestions("question/findByQuizId", param, userData.jwt)
    setQuiz(quiz);
  }

  handleStart = () => {
    console.log(this.props)
  }

  renderQuiz = () => {
    const { name, description} = this.props.quiz
    return(
      <div className="quiz">
        <div className="quizName">{name}</div>
        <div className="quizDescription">{description}</div>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions = () => {
    const { permission } = this.props;
    return(
      <div className="options">
        { permission === "USER" ? <Link to="#" className="start" onClick={this.handleStart}><i className="far fa-play-circle blue"></i> Start</Link> : null }
        { permission === "READ-ONLY" ? <Link to="/viewQuiz" className="view" onClick={this.handleView}><i className="far fa-eye blue"></i> View</Link> : null }
        { permission === "ADMIN" ? <Link to="/editQuiz" className="edit" onClick={this.handleView}><i className="fas fa-edit blue"></i> Edit</Link> : null }
        { permission === "ADMIN" ? <Link to="#" className="deleteOption" onClick={this.handleDelete}><i className="fas fa-trash-alt red"></i> Delete</Link> : null }
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

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    modalState: state.showModal
  }
}

export default connect(mapStateToProps,{ setQuiz, setNotification, deleteQuiz, showModal, getQuestions })(QuizResult)
