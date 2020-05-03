import React from 'react';
import Question from './question'

class Questions extends React.Component {

  renderQuestions = () => {
    const { questions } = this.props
    const listOfQuestions = questions.map(question => {
      return <Question key={questions.indexOf(question)} question={question} />
    });
    return listOfQuestions;
  }

  render(){
    return(
        <div>
          {this.renderQuestions()}
        </div>
    );
  }
}

export default Questions
