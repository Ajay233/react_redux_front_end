import React from 'react'
import { connect } from 'react-redux'
import Notification from '../notifications/notifications'
import QuizResults from '../quizSearch/quizResults'
import Modal from '../modal/modal'

import { getAllQuizes, deleteQuizFromCategory, clearQuizes } from '../quizSearch/actions'
import { hideModal } from '../modal/actions'
import { setNotification } from '../notifications/actions'
import { getQuestions } from '../question/actions'
import { del } from '../axiosRequests/requests'
import { sessionExpired } from '../utils/session'
import history from '../history'

import "../stylesheets/allQuizzes.css"

export class AllQuizes extends React.Component {

  componentWillUnmount(){
    this.props.clearQuizes();
  }

  renderModal = () => {
    const { hideModal } = this.props
    const { showModal, showModal2 } = this.props.modalState
    if(showModal){
      return(
        <Modal
          show={showModal}
          title={"Quiz"}
          message={"You are about to delete a quiz which will also delete any questions and answers associated with is"}
          onDelete={this.handleDelete}
          onCancel={hideModal}
        />
      );
    } else if(showModal2){
      return(
        <Modal
          type={"start"}
          show={showModal2}
          title={"Start Quiz"}
          message={"You are about to start a quiz, would you like to continue?"}
          onStart={this.handleStartQuiz}
          onCancel={hideModal}
        />
      );
    } else {
      return null
    }
  }

  renderCategoryIcon = (category) => {
    switch (category) {
      case "Comics": return <div><img className="categoryIcon" src={require("../public/icons/comics.png")} alt=""/></div>
      case "TV": return <div><img className="categoryIcon" src={require("../public/icons/tv.png")} alt=""/></div>
      case "Gaming": return <div><img className="categoryIcon" src={require("../public/icons/games.png")} alt=""/></div>
      case "Films": return <div><img className="categoryIcon" src={require("../public/icons/films2.png")} alt=""/></div>
      case "Sports": return <div><img className="categoryIcon" src={require("../public/icons/sport.png")} alt=""/></div>
      case "Music": return <div><img className="categoryIcon" src={require("../public/icons/music.png")} alt=""/></div>
      case "History": return <div><img className="categoryIcon" src={require("../public/icons/books.png")} alt=""/></div>
      case "Science": return <div><img className="categoryIcon" src={require("../public/icons/science.png")} alt=""/></div>
      case "Technology": return <div><img className="categoryIcon" src={require("../public/icons/technology.png")} alt=""/></div>
      case "Art": return <div><img className="categoryIcon" src={require("../public/icons/art.png")} alt=""/></div>
      case "Literature": return <div><img className="categoryIcon" src={require("../public/icons/books.png")} alt=""/></div>
      case "General Knowledge": return <div><img className="categoryIcon" src={require("../public/icons/generalKnowledge.png")} alt=""/></div>
      default: return null
    }
  }

  // add contitional css alternate between left and right align classes
  // Will need a way to turn this on and off, possibly by using history.location.pathname
  // so this is only applied on the all quizes view
  renderCategories = () => {
    const { quizes, userData } = this.props
    let quizesList = quizes.map(listItem => {
      let filteredQuizList = userData.permission === "USER" ? listItem.quizList.filter(quiz => quiz.status === "READY") : listItem.quizList;
      return(
        <div key={"QuizCategory" + quizes.indexOf(listItem)} className="quizCategorySection">
          <div className="categoryHeader">
            <div className="categoryTitle">{filteredQuizList.length === 0 ? null : listItem.category}</div>
            <div>{filteredQuizList.length === 0 ? null : this.renderCategoryIcon(listItem.category)}</div>
          </div>
          {this.renderResultHeadings(filteredQuizList)}
          <QuizResults key={"Quiz" + quizes.indexOf(listItem)} quizes={filteredQuizList} permission={userData.permission} jwt={userData.jwt} />
        </div>
      );
    })
    return quizesList;
  }

  renderResultHeadings = (quizes) => {
    return quizes.length === 0 ? null : this.resultHeadings()
  }

  resultHeadings = () => {
    return(
      <div id="resultsHeadings">
        <div id="nameHeader">Quiz Name</div>
        <div id="descriptionHeader">Description</div>
      </div>
    )
  }

  handleDelete = () => {
    const { quiz, userData, deleteQuizFromCategory, setNotification, hideModal } = this.props;
    const config = {
      data: quiz
    }
    del("quiz/delete", config, userData.jwt).then((response) => {
      hideModal()
      deleteQuizFromCategory(quiz)
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

  handleStartQuiz = () => {
    const { userData, quiz, getQuestions, hideModal } = this.props
    const param = { quizId: quiz.id }
    getQuestions("question/findByQuizId", param, userData.jwt, true)
    hideModal()
    history.push("/startQuiz")
  }

  render(){
    const { modalState, hideModal } = this.props
    return(
      <div className="componentContainer">
        <Notification />
        <div id="allQuizzesTitle">Browse all quizzes by Category</div>
        {this.renderModal()}
        {this.renderCategories()}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quizes: state.quizes,
    quiz: state.quiz,
    modalState: state.modalState
  }
}

export default connect(mapStateToProps,
  { getAllQuizes,
    deleteQuizFromCategory,
    getQuestions,
    hideModal,
    setNotification,
    clearQuizes
  })(AllQuizes)
