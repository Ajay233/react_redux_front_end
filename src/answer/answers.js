import React from 'react';
import Answer from './answer'

const Answers = (props) => {

  const renderAnswers = () => {
    const { answers, userData, setCurrentAnswer, setNotification, deleteAnswer, showModal } = props;
    const listOfAnswers = answers.map(answer => {
      return( <Answer
                key={answers.indexOf(answer)}
                answer={answer}
                userData={userData}
                setCurrentAnswer={setCurrentAnswer}
                setNotification={setNotification}
                deleteAnswer={deleteAnswer}
                showModal={showModal}
              />
      );
    });
    return listOfAnswers;
  }


  return(
    <div>
      {renderAnswers()}
    </div>
  );

}

export default Answers
