import React from 'react'
import { connect } from 'react-redux'
import Answers from '../answer/answers'

class QuestionView extends React.Component {

  renderAnswers = () => {
    const { answers } = this.props;
    return answers.length === 0 ? null : <Answers answers={answers} />
  }

  render(){
    const { questionNumber, description } = this.props.currentQuestion
    return(
      <div id="questionView">test
        <div>{`Question number ${questionNumber} from the ${this.props.quiz.name} quiz`}</div>
        <div>{ description }</div>
        <div id="answersHeader">Answers</div>
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
