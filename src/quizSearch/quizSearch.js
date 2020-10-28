import React from 'react';
import { connect } from 'react-redux'
import QuizResults from './quizResults'
import QuizSearchByName from './forms/findQuizByName'
import QuizSearchByCategory from './forms/findQuizByCategory'
import Notification from '../notifications/notifications'
import Modal from '../modal/modal'
import Loading from '../components/loading'
import { setNotification } from '../notifications/actions'
import { setQuizes, getQuizSearchResults, deleteQuiz, clearQuizes } from './actions'
import { getQuestions } from '../question/actions'
import { setQuiz } from '../quiz/actions'
import { hideModal, showModal, showModal2 } from '../modal/actions'
import { setQuizDownloadData } from '../pdf/actions'
import history from '../history'

import "../stylesheets/quizSearch.css"


export class QuizSearch extends React.Component {

  componentDidMount(){
    if(!this.props.userData.loggedIn){
      history.push('/login')
      this.props.setNotification("Your session has expired, please log in to continue", "warning", true)
    }
    document.documentElement.scrollTop = 0;
  }

  // componentWillUnmount(){
  //   console.log("I will now clear the quizzes store :)")
  //   this.props.clearQuizes();
  // }

  renderModal = () => {
    const { hideModal } = this.props
    const { showModal, showModal2 } = this.props.modalState
    if(showModal === true){
      return(
        <Modal
          type={"delete"}
          show={showModal}
          title={"Delete Quiz"}
          message={"You are about to delete a quiz which will also delete any questions and answers associated with it.  Do you want to continue?"}
          onDelete={this.handleDelete}
          onCancel={hideModal}
        />
      );
    } else if(showModal2 === true){
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
      return null;
    }
  }

  renderResultsTitle = (quizes) => {
    return quizes.length === 0 ? null : this.resultsTitle(quizes);
  }

  resultsTitle = (quizes) => {
    return  <div id="resultHeader">{`${quizes.length} ${quizes.length > 1 ? 'Results' : 'Result'}`}</div>
  }

  renderResultHeadings = (quizes) => {
    return quizes.length === 0 ? null : this.resultHeadings()
  }

// <div id="optionsHeader">Options</div>
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
    const { quiz, userData, deleteQuiz } = this.props;
    const config = { data: quiz }
    deleteQuiz(config, userData.jwt)
  }

  handleStartQuiz = () => {
    const { userData, quiz, getQuestions, hideModal } = this.props
    const param = { quizId: quiz.id }
    getQuestions("question/findByQuizId", param, userData.jwt, true)
    hideModal()
    history.push("/startQuizIntro")
  }

  render(){
    const {
      quizes,
      userData,
      setNotification,
      getQuizSearchResults,
      lists,
      clearQuizes,
      showModal,
      showModal2,
      setQuiz,
      getQuestions,
      setQuizDownloadData,
      globals
    } = this.props
    return(
      <React.Fragment>
      <Loading loaderState={globals.loaderState} />
      <div id="quizSearch" className="componentContainer">
        {this.renderModal()}
        <Notification />
        <div id="quizSearchTitle">
          <img id="searchTitleImg" src={require("../public/icons/search.png")} alt=""/>
          <div id="quizSearchTitleText">Quiz Search</div>
        </div>
        <div id="quizSearchForms">
          <div id="quizSearchByName">
            <QuizSearchByName
              jwt={userData.jwt}
              setNotification={setNotification}
              getQuizSearchResults={getQuizSearchResults}
              permission={userData.permission}
            />
          </div>
          <div className="divider-left"></div>
          <div className="divider-right"></div>
          <div id="quizSearchByCategory">
            <QuizSearchByCategory
              jwt={userData.jwt}
              setNotification={setNotification}
              getQuizSearchResults={getQuizSearchResults}
              categories={lists.categories}
              permission={userData.permission}
            />
          </div>
        </div>
        <div>
          {this.renderResultsTitle(quizes)}
          {this.renderResultHeadings(quizes)}
          <QuizResults
            quizes={quizes}
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
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    notificationData: state.notificationData,
    quizes: state.quizes,
    quiz: state.quiz,
    lists: state.lists,
    modalState: state.modalState,
    globals: state.globals
  }
}

export default connect(mapStateToProps,
  {
    setQuizes,
    getQuizSearchResults,
    setNotification,
    hideModal,
    showModal,
    showModal2,
    getQuestions,
    deleteQuiz,
    clearQuizes,
    setQuiz,
    setQuizDownloadData
  })(QuizSearch)
