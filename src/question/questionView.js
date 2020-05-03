import React from 'react'
import { connect } from 'react-redux'
import Answers from '../answer/answers'

class QuestionView extends React.Component {

  renderAnswers = () => {
    const { answers } = this.props;
    return answers.length === 0 ? null : <Answers answers={answers} />
  }

  render(){
    return(
      <div id="questionView">test
        <div></div>
        <div></div>
        <div></div>
        <div id="answers">
          {this.renderAnswers()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quiz: state.quiz,
    currentQuestion: state.currentQuestion,
    answers: state.answers
  }
}

export default connect(mapStateToProps)(QuestionView)
