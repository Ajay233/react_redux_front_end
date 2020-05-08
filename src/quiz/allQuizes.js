import React from 'react'
import { connect } from 'react-redux'
import Notification from '../notifications/notifications'
import QuizResults from '../quizSearch/quizResults'
import Modal from '../modal/modal'

import { getAllQuizes, deleteQuiz } from '../quizSearch/actions'
import { hideModal } from '../modal/actions'
import { setNotification } from '../notifications/actions'

import { del } from '../axiosRequests/requests'

class AllQuizes extends React.Component {

  renderCategories = () => {
    const { quizes, userData } = this.props
    let quizesList = quizes.map(listItem => {
      return(
        <div className="bottomSpacing">
          <div className="title-large-left">{listItem.category}</div>
          {this.renderResultHeadings(listItem.quizList)}
          <QuizResults quizes={listItem.quizList} permission={userData.permission} jwt={userData.jwt} />
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
      hideModal()
      setNotification("Error - Unable to delete this quiz", "error", true)
    })
  }

  render(){
    const { modalState, hideModal } = this.props
    return(
      <div className="componentContainer">
        <Notification />
        <Modal
          show={modalState.showModal}
          title={"Quiz"}
          message={"You are about to delete a quiz which will also delete any questions and answers associated with is"}
          onDelete={this.handleDelete}
          onCancel={hideModal}
          />
          {this.renderCategories()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quizes: state.quizes,
    quiz: state.quiz,
    modalState: state.showModal
  }
}

export default connect(mapStateToProps, { getAllQuizes, deleteQuiz, hideModal, setNotification })(AllQuizes)
