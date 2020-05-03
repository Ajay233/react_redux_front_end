import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentQuestion } from './actions'
import { getAnswers } from '../answer/actions'

class Question extends React.Component {

  handleEdit = () => {

  }

  handleView = () => {
    const { question, userData } = this.props
    const param = { questionId: question.id }
    this.props.getAnswers("answer/findByQuestionId", param, userData.jwt)
    this.props.setCurrentQuestion(question)
  }

  handleDelete = () => {

  }


  renderQuestion = () => {
    const { questionNumber, description } = this.props.question
    return(
      <div>
        <div className="questionNumber">{questionNumber}</div>
        <div className="questionDescription">{description}</div>
        <div className="questionOptions">{this.renderOptions()}</div>
      </div>
    )
  }

  renderOptions = () => {
    const { permission } = this.props.userData;
    return(
      <div className="options">
        { permission === "READ-ONLY" ? <Link to="/viewQuestion" className="view" onClick={this.handleView}><i className="far fa-eye blue"></i> View</Link> : null }
        { permission === "ADMIN" ? <Link to="#" className="edit" onClick={this.handleEdit}><i className="fas fa-edit blue"></i> Edit</Link> : null }
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

export default connect(mapStateToProps, { getAnswers, setCurrentQuestion })(Question)
