import React from 'react';
import Question from './question'

class Questions extends React.Component {

  renderQuestions = () => {
    const { questions, userData, getAnswers, setCurrentQuestion, setNotification, deleteQuestion, showModal } = this.props
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

  render(){
    return(
        <div>
          {this.renderQuestions()}
        </div>
    );
  }
}

export default Questions
