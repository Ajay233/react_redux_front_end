import React from 'react'
import { Link } from 'react-router-dom'

export class Answer extends React.Component {

  handleEdit = () => {
    this.props.setCurrentAnswer(this.props.answer);
  }

  handleDelete = () => {
    this.props.showModal();
    this.props.setCurrentAnswer(this.props.answer);
  }

  renderAnswer = () => {
    const { answerNumber, description, correctAnswer } = this.props.answer
    return(
      <div className="answerContainer">
        <div className="ansNumber">{ answerNumber }</div>
        <div className="ansDecription">{ description }</div>
        <div className="correctAns">{ correctAnswer === true ? <i className="far fa-check-circle green"></i> : <i className="far fa-times-circle red"></i> }</div>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions = () => {
    const { permission } = this.props.userData;
    return(
      <div className="options">
        { permission === "ADMIN" || permission === "SUPER-USER" ? <Link to="#" className="deleteOption" onClick={this.handleDelete}><i className="fas fa-trash-alt red"></i> Delete</Link> : null }
        { permission === "ADMIN" || permission === "SUPER-USER" ? <Link to="/editAnswer" className="edit" onClick={this.handleEdit}><i className="fas fa-edit blue"></i> Edit</Link> : null }
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

export default Answer
