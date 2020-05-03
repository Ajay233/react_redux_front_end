import React from 'react'
import { connect } from 'react-redux'
import Notification from '../notifications/notifications'
import Questions from '../question/questions'
import UpdateQuizForm from '../forms/updateQuiz'

import { getQuestions } from '../question/actions'
import { setNotification } from '../notifications/actions'
import { setQuiz } from './actions'

class Quiz extends React.Component {

  componentDidMount(){
    const { userData, quiz, getQuestions } = this.props
    const param = { quizId: quiz.id }
    getQuestions("question/findByQuizId", param, userData.jwt)
  }

  renderQuestions = () => {
    const { questions } = this.props;
    return questions.length === 0 ? null : <Questions questions={questions}/>
  }

  render(){
    const { name, description } = this.props.quiz
    return(
      <div className="">
        <Notification />
        <div>{name}</div>
        <div>Description:</div>
        <div>{description}</div>
        <UpdateQuizForm
          setNotification={this.props.setNotification}
          setQuiz={this.props.setQuiz}
          jwt={this.props.userData.jwt}
          quiz={this.props.quiz}
        />
        <div>Questions:</div>
        <Questions questions={this.props.questions}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quiz: state.quiz,
    questions: state.questions
  }
}

export default connect(mapStateToProps, { getQuestions, setQuiz, setNotification })(Quiz)
