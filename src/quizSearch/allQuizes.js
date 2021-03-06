import React from 'react'
import { connect } from 'react-redux'
import Notification from '../notifications/notifications'
import QuizResults from './quizResults'
import Modal from '../modal/modal'
import StaticLoading from '../components/staticLoading.js'

import { getAllQuizes, deleteQuizFromCategory, clearQuizes } from './actions'
import { hideModal, showModal, showModal2 } from '../modal/actions'
import { setNotification } from '../notifications/actions'
import { getQuestions } from '../question/actions'
import { setQuiz } from '../quiz/actions'
import { setQuizDownloadData } from '../pdf/actions'
import history from '../history'

import "../stylesheets/allQuizzes.css"

export class AllQuizes extends React.Component {

  componentDidMount(){
    if(!this.props.userData.loggedIn){
      history.push('/login')
      this.props.setNotification("Your session has expired, please log in to continue", "warning", true)
    }
    document.documentElement.scrollTop = 0;
    this.props.clearQuizes()
    this.props.getAllQuizes("quiz/getAll", this.props.userData.jwt)
  }

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
          title={"Delete Quiz"}
          message={"You are about to delete a quiz which will also delete any questions and answers associated with it.  Do you want to continue?"}
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
      case "History": return <div><img className="categoryIcon" src={require("../public/icons/museumV2.png")} alt=""/></div>
      case "Science": return <div><img className="categoryIcon" src={require("../public/icons/science.png")} alt=""/></div>
      case "Technology": return <div><img className="categoryIcon" src={require("../public/icons/technology.png")} alt=""/></div>
      case "Art": return <div><img className="categoryIcon" src={require("../public/icons/art.png")} alt=""/></div>
      case "Literature": return <div><img className="categoryIcon" src={require("../public/icons/books.png")} alt=""/></div>
      case "General Knowledge": return <div><img className="categoryIcon" src={require("../public/icons/generalKnowledge.png")} alt=""/></div>
      case "Food and Drink": return <div><img className="categoryIcon" src={require("../public/icons/Food-icon.png")} alt=""/></div>
      case "Geography": return <div><img className="categoryIcon" src={require("../public/icons/globe-icon.png")} alt=""/></div>
      default: return null
    }
  }

  renderQuizResults = (filteredQuizList, quizes, listItem, userData, setNotification) => {
    const { clearQuizes, setQuiz, showModal, showModal2, getQuestions, setQuizDownloadData } = this.props
    if(filteredQuizList.length > 0){
      return(
        <React.Fragment>
          {this.renderResultHeadings(filteredQuizList)}
          <QuizResults
            key={"Quiz" + quizes.indexOf(listItem)}
            quizes={filteredQuizList}
            permission={userData.permission}
            jwt={userData.jwt}
            setNotification={setNotification}
            clearQuizes={clearQuizes}
            setQuiz={setQuiz}
            showModal={showModal}
            showModal2={showModal2}
            getQuestions={getQuestions}
            setQuizDownloadData={setQuizDownloadData}
            userId={userData.id}
          />
        </React.Fragment>
      );
    } else {
      return <div id="noQuizzesMsg">There are currenty no quizzes for this category</div>
    }
  }

  // add contitional css alternate between left and right align classes
  // Will need a way to turn this on and off, possibly by using history.location.pathname
  // so this is only applied on the all quizes view
  renderCategories = () => {
    const { quizes, userData, setNotification } = this.props
    let quizesList = quizes.map(listItem => {
      let filteredQuizList = userData.permission === "USER" ? listItem.quizList.filter(quiz => quiz.status === "READY") : listItem.quizList;
      return(
        <div key={"QuizCategory" + quizes.indexOf(listItem)} className="quizCategorySection">
          <div className="categoryHeader">
            <div className="categoryTitle">{listItem.category}</div>
            <div>{this.renderCategoryIcon(listItem.category)}</div>
          </div>
          {this.renderQuizResults(filteredQuizList, quizes, listItem, userData, setNotification)}
        </div>
      );
    })
    return quizesList;
  }

  renderResultHeadings = (quizes) => {
    return quizes.length === 0 ? null : this.resultHeadings()
  }

  resultHeadings = () => {
    const { permission } = this.props.userData
    return(
      <div id="resultsHeadings" className="resultHeadings">
        <div className={permission !== "USER" ? "nameHeader" : "nameHeaderExpanded"}>Quiz Name</div>
        <div className="descriptionHeader">Description</div>
        { permission !== "USER" ? <div className="statusHeader">Status</div> : null }
      </div>
    )
  }

  handleDelete = () => {
    const { quiz, userData, deleteQuizFromCategory } = this.props;
    const config = { data: quiz }
    deleteQuizFromCategory(config, userData.jwt)
  }

  handleStartQuiz = () => {
    const { userData, quiz, getQuestions, hideModal } = this.props
    const param = { quizId: quiz.id }
    getQuestions("question/findByQuizId", param, userData.jwt, true)
    hideModal()
    history.push("/startQuizIntro")
  }

  renderComponent = () => {
    const { quizes } = this.props;
    if(quizes === null || quizes.length === 0 ){
      return(
        <StaticLoading message={"Loading..."} />
      );
    } else {
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

  render(){
    return(
      <React.Fragment>
        {this.renderComponent()}
      </React.Fragment>
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
    clearQuizes,
    setQuiz,
    showModal,
    showModal2,
    setQuizDownloadData
  })(AllQuizes)
