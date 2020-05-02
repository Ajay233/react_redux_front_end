import React from 'react'

class Quiz extends React.Component {

  renderQuiz = () => {
    const { name, description } = this.props
    return(
      <div className="quiz">
        <div className="quizName">{name}</div>
        <div className="quizDescription">{description}</div>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions = () => {
    const { permission } = this.props;
    return(
      <div className="options">
        { permission === "USER" ? <div className="start"><i className="far fa-play-circle blue"></i> Start</div> : null }
        { permission === "READ-ONLY" ? <div className="view"><i className="far fa-eye blue"></i> View</div> : null }
        { permission === "ADMIN" ? <div className="edit"><i className="fas fa-edit blue"></i> Edit</div> : null }
        { permission === "ADMIN" ? <div className="deleteOption"><i className="fas fa-trash-alt red"></i> Delete</div> : null }
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

export default Quiz
