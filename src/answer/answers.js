import React from 'react';
import Answer from './answer'

class Answers extends React.Component {

  renderAnswers = () => {
    const { answers } = this.props;
    const listOfAnswers = answers.map(answer => {
      return <Answer key={answers.indexOf(answer)} answer={answer} />
    });
    return listOfAnswers;
  }

  render(){
    return(
      <div>
        {this.renderAnswers()}
      </div>
    );
  }
}

export default Answers
