import React from 'react'
import { connect } from 'react-redux'

import PickAnswer from '../forms/pickAnswer'
import { addAnswer, incrementQuestion, showResults, exitQuiz } from './actions'
import { setCurrentQuestion } from '../question/actions'
import { getAnswers } from '../answer/actions'

class QuizStart extends React.Component {

  handleSubmit = ({ answer }) => {
    const { questions } = this.props;
    const { questionNumber } = this.props.quizProgressTracking
    questionNumber + 1 < questions.length ? this.nextQuestion(answer) : this.addLastAnswer(answer);
  }

  nextQuestion = (answer) => {
    const { questions, addAnswer, answers, incrementQuestion, setCurrentQuestion, getAnswers, userData } = this.props;
    const { questionNumber } = this.props.quizProgressTracking
    const body = { questionId: questions[questionNumber + 1].id }
    const mappedAnswer = answers.filter(e => {return e.description === answer})
    addAnswer(mappedAnswer[0]);
    incrementQuestion(questionNumber + 1);
    setCurrentQuestion(questions[questionNumber + 1]);
    getAnswers("answer/findByQuestionId", body, userData.jwt)
  }

  addLastAnswer = (answer) => {
    const { addAnswer, answers, incrementQuestion, showResults } = this.props;
    const { questionNumber } = this.props.quizProgressTracking
    const mappedAnswer = answers.filter(e => {return e.description === answer})
    addAnswer(mappedAnswer[0]);
    incrementQuestion(questionNumber + 1);
    showResults();
  }

  renderResults = () => {
    const { questions } = this.props;
    const { answersPicked, showResults } = this.props.quizProgressTracking
    const correctAnswers = answersPicked.filter(e => { return e.correctAnswer === true })
    return showResults ? <div className="title-large">{`You scored ${correctAnswers.length} out of ${questions.length}`}</div> : null;
  }

  renderQuestion = () => {
    const { currentQuestion } = this.props;
    return(
      <div className="sectionSpacing">
        <div className="title-medium-left">{`Question ${currentQuestion.questionNumber}`}</div>
        <div>
          {currentQuestion.description}
        </div>
      </div>
    );
  }

  render(){
    const { quiz, answers, questions, exitQuiz } = this.props
    const { showResults, questionNumber } = this.props.quizProgressTracking
    return(
      <div className="componentContainer">
        {questions[1] === undefined ? null : console.log(questions[1].description)}
        <div className="title-large">{quiz.name}</div>
        {this.renderQuestion()}
        <PickAnswer
          title={"Answers"}
          answers={answers}
          onSubmit={this.handleSubmit}
          numberOfQuestions={questions.length}
          currentQuestionNumber={questionNumber + 1}
          showResults={showResults}
          exit={exitQuiz}
          />
        {this.renderResults()}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return{
    userData: state.userData,
    quiz: state.quiz,
    questions: state.questions,
    currentQuestion: state.currentQuestion,
    answers: state.answers,
    quizProgressTracking: state.quizProgressTracking
  }
}

export default connect(mapStateToProps, { addAnswer, setCurrentQuestion, getAnswers, incrementQuestion, showResults, exitQuiz })(QuizStart)
