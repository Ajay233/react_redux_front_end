import React from 'react';
import { connect } from 'react-redux'
import QuizResults from './quizResults'
import QuizSearchByName from '../forms/findQuizByName'
import QuizSearchByCategory from '../forms/findQuizByCategory'
import Notification from '../notifications/notifications'
import { setNotification } from '../notifications/actions'
import { setQuizes, getQuizSearchResults } from './actions'
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

  render(){
    const { quizes, userData, setNotification, getQuizSearchResults } = this.props
    return(
      <div id="quizSearch">
        <Notification />
        <div id="quizSearchTitle">Quiz Search</div>
        <div id="quizSearchByName">
          <QuizSearchByName jwt={userData.jwt} setNotification={setNotification} getQuizSearchResults={getQuizSearchResults} />
        </div>
        <div id="quizSearchByCategory">
          <QuizSearchByCategory jwt={userData.jwt} setNotification={setNotification} getQuizSearchResults={getQuizSearchResults} />
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
    quizes: state.quizes
  }
}

export default connect(mapStateToProps, { setQuizes, getQuizSearchResults, setNotification })(QuizSearch)
