import React from 'react';
import { connect } from 'react-redux'
import Quizes from './quizes'
import QuizSearchByName from '../forms/findQuizByName'
import Notification from '../notifications/notifications'
import { setNotification } from '../notifications/actions'
import { setQuizes, getQuizSearchResults } from './actions'
import "../stylesheets/quizSearch.css"


class QuizSearch extends React.Component {

  renderResultsTitle = (quizes) => {
    return quizes.length === 0 ? null : <div id="resultHeader">{`${quizes.length} Results`}</div>;
  }

  renderResultHeadings = (quizes) => {
    return quizes.length === 0 ? null : this.resultHeadings()
  }

  resultHeadings = () => {
    return(
      <div id="resultsHeadings">
        <div id="nameHeader">Quiz Name</div>
        <div id="descriptionHeader">Description</div>
        <div id="optionsHeader">Options</div>
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

        </div>
        <div>
          {this.renderResultsTitle(quizes)}
          {this.renderResultHeadings(quizes)}
          <Quizes quizes={quizes} permission={userData.permission} />
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
