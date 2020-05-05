import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentQuestion, deleteQuestion } from './actions'
import { getAnswers } from '../answer/actions'
import { setNotification } from '../notifications/actions'
import { showModal } from '../modal/actions'


class Question extends React.Component {

  handleView = () => {
    const { question, userData } = this.props
    const param = { questionId: question.id }
    this.props.getAnswers("answer/findByQuestionId", param, userData.jwt)
    this.props.setCurrentQuestion(question);
  }

  // handleDelete = () => {
  //   const { question, userData, setNotification, deleteQuestion } = this.props;
  //   const config = {
  //     data: [question]
  //   }
  //   del("question/delete", config, userData.jwt).then((response) => {
  //     deleteQuestion(question);
  //     setNotification("Question deleted", "success", true);
  //   }).catch((error) => {
  //     console.log(error.response);
  //     setNotification("Error - Unable to delete this question", "error", true)
  //   });
  // }

  handleDelete = () => {
    const { question } = this.props
    this.props.setCurrentQuestion(question);
    this.props.showModal();
  }

  renderQuestion = () => {
    const { questionNumber, description } = this.props.question
    return(
      <div className="questionContainer">
        <div className="questionNumber">{questionNumber}</div>
        <div className="questionDescription">{description}</div>
        {this.renderOptions()}
      </div>
    )
  }

  renderOptions = () => {
    const { permission } = this.props.userData;
    return(
      <div className="options">
        { permission === "READ-ONLY" ? <Link to="/viewQuestion" className="view" onClick={this.handleView}><i className="far fa-eye blue"></i> View</Link> : null }
        { permission === "ADMIN" ? <Link to="/editQuestion" className="edit" onClick={this.handleView}><i className="fas fa-edit blue"></i> Edit</Link> : null }
        { permission === "ADMIN" ? <Link to="#" className="deleteOption" onClick={this.handleDelete}><i className="fas fa-trash-alt red"></i> Delete</Link> : null }
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderQuestion()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps,
  { getAnswers,
    setCurrentQuestion,
    setNotification,
    deleteQuestion,
    showModal
  })(Question)
