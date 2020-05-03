import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Question extends React.Component {

  renderQuestion = () => {
    const { question_number, description } = this.props.question
    return(
      <div>
        <div className="questionNumber">{question_number}</div>
        <div className="questionDescription">{description}</div>
        <div className="questionOptions">{this.renderOptions()}</div>
      </div>
    )
  }

  renderOptions = () => {
    const { permission } = this.props.userData;
    return(
      <div className="options">
        { permission === "USER" ? <Link to="#" className="start" onClick={this.handleStart}><i className="far fa-play-circle blue"></i> Start</Link> : null }
        { permission === "READ-ONLY" ? <Link to="#" className="view" onClick={this.handleView}><i className="far fa-eye blue"></i> View</Link> : null }
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

export default connect(mapStateToProps)(Question)
