import React from 'react'
import { connect } from 'react-redux'
import Answers from '../answer/answers'
import UpdateQuestionForm from '../forms/updateQuestion'
import Notification from '../notifications/notifications'

class QuestionView extends React.Component {

  renderAnswers = () => {
    const { answers } = this.props;
    return answers.length === 0 ? null : <Answers answers={answers} />
  }

  render(){
    const { questionNumber, description } = this.props.currentQuestion
    return(
      <div id="questionView">test
        <Notification />
        <div>{`Question number ${questionNumber} from the ${this.props.quiz.name} quiz`}</div>
        <div>{ description }</div>
        <UpdateQuestionForm />
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
