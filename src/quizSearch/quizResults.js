import React from 'react'
import QuizResult from './quizResult'

class QuizResults extends React.Component {

  buildQuizes = () => {
    const { quizes, permission } = this.props;
    const listOfQuizes = quizes.map(quiz => {
      return <QuizResult key={quizes.indexOf(quiz)} name={quiz.name} description={quiz.description} permission={permission} />
    })
    return listOfQuizes
  }

  renderQuizes = () => {
    return this.props.quizes.length === 0 ? null : this.buildQuizes();
  }

  render(){
    return(
      <div>
        {this.renderQuizes()}
      </div>
    );
  }
}

export default QuizResults
