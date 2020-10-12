import React from 'react'
import { connect } from 'react-redux'
import PickAnswer from './forms/pickAnswer'
import { addAnswer, incrementQuestion, showResults, exitQuiz, clearQuizProgress } from './actions'
import { setCurrentQuestion } from '../question/actions'
import { getAnswers } from '../answer/actions'
import { setNotification } from '../notifications/actions'
import history from '../history'
import '../stylesheets/quizStart.css'

export class QuizStart extends React.Component {

  componentDidMount(){
    if(!this.props.userData.loggedIn){
      history.push('/login')
      this.props.setNotification("Your session has expired, please log in to continue", "warning", true)
    }
    window.scrollTo(500, 0);
  }

  componentWillUnmount(){
    this.props.clearQuizProgress()
  }

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
    getAnswers(body, userData.jwt)
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
    return showResults ? <div id="quizResult" className="title-large"><b>{`You scored ${correctAnswers.length} out of ${questions.length}`}</b></div> : null;
  }

  renderQuestion = () => {
    const { currentQuestion } = this.props;
    return(
      <div id="questionContainer" className="sectionSpacing">
        <div className="title-medium-left-alt">{`Question ${currentQuestion.questionNumber}`}</div>
        <div>
          {currentQuestion.description}
        </div>
      </div>
    );
  }

  renderQuestionImg = () => {
    const { imgUrl } = this.props.currentQuestion
    if(imgUrl !== null){
      return(
        <div id="questionImageContainer" className="">
          <div className="imgWrapper">
            <img src={imgUrl} alt="" className="quizQuestionImg"/>
          </div>
        </div>
      );
    } else {
      return null
    }
  }

  render(){
    const { quiz, answers, questions, exitQuiz, currentQuestion } = this.props
    const { showResults, questionNumber } = this.props.quizProgressTracking
    return(
      <div className="componentContainer">
        {questions[1] === undefined ? null : console.log(questions[1].description)}
        <div id="quizStartTitle">{quiz.name}</div>
        <div id="quizStartContainer">
          <div className={currentQuestion.imgUrl === null ? "questionDetailsContainer" : "questionDetailsContainerAdjusted"}>
            {this.renderQuestion()}
            <img id="quizBot2" src={require("../public/icons/quizBot2.png")} alt="" />
            {this.renderResults()}
          </div>
          {this.renderQuestionImg()}
          <div className={currentQuestion.imgUrl === null ? "answerFormContainer" : "answerFormContainerAdjusted"}>
            <PickAnswer
              title={"Answers"}
              answers={answers}
              onSubmit={this.handleSubmit}
              numberOfQuestions={questions.length}
              currentQuestionNumber={questionNumber + 1}
              showResults={showResults}
              exit={exitQuiz}
            />
          </div>
        </div>
      </div>
    );
  }
}


export const mapStateToProps = (state) => {
  return{
    userData: state.userData,
    quiz: state.quiz,
    questions: state.questions,
    currentQuestion: state.currentQuestion,
    answers: state.answers,
    quizProgressTracking: state.quizProgressTracking
  }
}

export default connect(mapStateToProps,
  { addAnswer,
    setCurrentQuestion,
    getAnswers,
    incrementQuestion,
    showResults,
    exitQuiz,
    clearQuizProgress,
    setNotification
  })(QuizStart)
