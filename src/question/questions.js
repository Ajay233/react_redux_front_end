import React from 'react';
import Question from './question'

const Questions = (props) => {

  const renderQuestions = () => {
    const { questions, userData, getAnswers, setCurrentQuestion, setNotification, deleteQuestion, showModal } = props
    const listOfQuestions = questions.map(question => {
      return( <Question
                key={questions.indexOf(question)}
                question={question}
                userData={userData}
                getAnswers={getAnswers}
                setCurrentQuestion={setCurrentQuestion}
                setNotification={setNotification}
                deleteQuestion={deleteQuestion}
                showModal={showModal}
              />
      );
    });
    return listOfQuestions;
  }

  return(
    <div>
      {renderQuestions()}
    </div>
  );
  
}

export default Questions
