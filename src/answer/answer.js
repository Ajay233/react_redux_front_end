import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Answer extends React.Component {

  handleEdit = () => {

  }

  handleDelete = () => {

  }

  renderAnswer = () => {
    const { answerNumber, description, correctAnswer } = this.props.answer
    return(
      <div>
        <div>{ answerNumber }</div>
        <div>{ description }</div>
        <div>{ correctAnswer === true ? <i className="far fa-check-circle"></i> : <i className="far fa-times-circle"></i> }</div>
        <div>{this.renderOptions()}</div>
      </div>
    );
  }

  renderOptions = () => {
    const { permission } = this.props.userData;
    return(
      <div className="options">
        { permission === "ADMIN" ? <Link to="#" className="edit" onClick={this.handleEdit}><i className="fas fa-edit blue"></i> Edit</Link> : null }
        { permission === "ADMIN" ? <Link to="#" className="deleteOption" onClick={this.handleDelete}><i className="fas fa-trash-alt red"></i> Delete</Link> : null }
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderAnswer()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps)(Answer)
