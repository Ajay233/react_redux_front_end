import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentAnswer, deleteAnswer } from './actions'
import { setNotification } from '../notifications/actions'

import { del } from '../axiosRequests/requests'

class Answer extends React.Component {

  handleEdit = () => {
    this.props.setCurrentAnswer(this.props.answer);
  }

  handleDelete = () => {
    const { answer, userData, setNotification, deleteAnswer } = this.props;
    const config = {
      data: [answer]
    }
    del("answer/delete", config, userData.jwt).then((response) => {
      deleteAnswer(answer);
      setNotification("Answer deleted", "success", true);
    }).catch((error) => {
      console.log(error.response);
      setNotification("Error - Unable to delete this answer", "error", true)
    });
  }

  renderAnswer = () => {
    const { answerNumber, description, correctAnswer } = this.props.answer
    return(
      <div className="answerContainer">
        <div className="ansNumber">{ answerNumber }</div>
        <div className="ansDecription">{ description }</div>
        <div className="correctAns">{ correctAnswer === true ? <i className="far fa-check-circle green"></i> : <i className="far fa-times-circle red"></i> }</div>
        <div className="ansOptions">{this.renderOptions()}</div>
      </div>
    );
  }

  renderOptions = () => {
    const { permission } = this.props.userData;
    return(
      <div className="options">
        { permission === "ADMIN" ? <Link to="/viewAnswer" className="edit" onClick={this.handleEdit}><i className="fas fa-edit blue"></i> Edit</Link> : null }
        { permission === "READ-ONLY" ? <Link to="#" className="deleteOption" onClick={this.handleDelete}><i className="fas fa-trash-alt red"></i> Delete</Link> : null }
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

export default connect(mapStateToProps, { setCurrentAnswer, setNotification, deleteAnswer })(Answer)
