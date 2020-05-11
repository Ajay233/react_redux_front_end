import React from 'react';
import { connect } from 'react-redux'
import QuizResults from './quizResults'
import QuizSearchByName from '../forms/findQuizByName'
import QuizSearchByCategory from '../forms/findQuizByCategory'
import Notification from '../notifications/notifications'
import Modal from '../modal/modal'
import { del } from '../axiosRequests/requests'
import { setNotification } from '../notifications/actions'
import { setQuizes, getQuizSearchResults, deleteQuiz } from './actions'
import { getQuestions } from '../question/actions'
import { hideModal } from '../modal/actions'
import { sessionExpired } from '../utils/session'
import history from '../history'

import "../stylesheets/quizSearch.css"


class QuizSearch extends React.Component {

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
    return(
      <div id="resultsHeadings">
        <div id="nameHeader">Quiz Name</div>
        <div id="descriptionHeader">Description</div>
      </div>
    )
  }

  handleDelete = () => {
    const { quiz, userData, deleteQuiz, setNotification, hideModal } = this.props;
    const config = {
      data: quiz
    }
    del("quiz/delete", config, userData.jwt).then((response) => {
      hideModal()
      deleteQuiz(quiz)
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
    const { quizes, userData, setNotification, getQuizSearchResults, modalState, hideModal, lists } = this.props
    return(
      <div id="quizSearch">
        <Modal
          type={"delete"}
          show={modalState.showModal}
          title={"Delete Quiz"}
          message={"You are about to delete a quiz which will also delete any questions and answers associated with is"}
          onDelete={this.handleDelete}
          onCancel={hideModal}
        />
        <Modal
          type={"start"}
          show={modalState.showModal2}
          title={"Start Quiz"}
          message={"You are about to start a quiz, would you like to continue?"}
          onStart={this.handleStartQuiz}
          onCancel={hideModal}
        />
        <Notification />
        <div id="quizSearchTitle">Quiz Search</div>
        <div id="quizSearchByName">
          <QuizSearchByName jwt={userData.jwt} setNotification={setNotification} getQuizSearchResults={getQuizSearchResults} />
        </div>
        <div id="quizSearchByCategory">
          <QuizSearchByCategory
            jwt={userData.jwt}
            setNotification={setNotification}
            getQuizSearchResults={getQuizSearchResults}
            categories={lists.categories}
          />
        </div>
        <div>
          {this.renderResultsTitle(quizes)}
          {this.renderResultHeadings(quizes)}
          <QuizResults quizes={quizes} permission={userData.permission} jwt={userData.jwt}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    notificationData: state.notificationData,
    quizes: state.quizes,
    quiz: state.quiz,
    lists: state.lists,
    modalState: state.showModal
  }
}

export default connect(mapStateToProps,
  {
    setQuizes,
    getQuizSearchResults,
    setNotification,
    hideModal,
    getQuestions,
    deleteQuiz
  })(QuizSearch)
