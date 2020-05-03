import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setQuiz } from '../quiz/actions'
import { del } from '../axiosRequests/requests'

class QuizResult extends React.Component {

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

  handleEdit = () => {

  }

  handleDelete = () => {
    
  }

  handleView = () => {
    this.props.setQuiz(this.props.quiz);
  }

  handleStart = () => {
    console.log(this.props)
  }

  // possible way to use different classes for option sheader if the header ends up being used
  optionsClass = (permission) => {
    return permission === "ADMIN" ? "" : "";
  }

  renderOptions = () => {
    const { permission } = this.props;
    return(
      <div className="options">
        { permission === "USER" ? <Link to="#" className="start" onClick={this.handleStart}><i className="far fa-play-circle blue"></i> Start</Link> : null }
        { permission === "READ-ONLY" ? <Link to="/viewQuiz" className="view" onClick={this.handleView}><i className="far fa-eye blue"></i> View</Link> : null }
        { permission === "ADMIN" ? <Link to="#" className="edit" onClick={this.handleEdit}><i className="fas fa-edit blue"></i> Edit</Link> : null }
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
    usedData: state.userData
  }
}

export default connect(mapStateToProps,{ setQuiz })(QuizResult)
