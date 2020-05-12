import React from 'react'
import QuizResult from './quizResult'

class QuizResults extends React.Component {

  buildQuizes = () => {
    const { quizes, permission , jwt} = this.props;
    const listOfQuizes = quizes.map(quiz => {
      return <QuizResult
                key={quizes.indexOf(quiz)}
                quiz={quiz}
                permission={permission}
                jwt={jwt}
              />
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
