import React from 'react'
import QuizResult from './quizResult'

const QuizResults = (props) => {

  const buildQuizes = () => {
    const {
      quizes,
      permission,
      jwt,
      setNotification,
      clearQuizes,
      setQuiz,
      showModal,
      showModal2,
      getQuestions,
      setQuizDownloadData
    } = props;
    const listOfQuizes = quizes.map(quiz => {
      return <QuizResult
                key={quizes.indexOf(quiz)}
                quiz={quiz}
                permission={permission}
                jwt={jwt}
                setNotification={setNotification}
                clearQuizes={clearQuizes}
                setQuiz={setQuiz}
                showModal={showModal}
                showModal2={showModal2}
                getQuestions={getQuestions}
                setQuizDownloadData={setQuizDownloadData}
              />
    })
    return listOfQuizes
  }



  const renderQuizes = () => {
    return props.quizes.length === 0 ? null : buildQuizes();
  }


  return(
    <div>
      {renderQuizes()}
    </div>
  );
}

export default QuizResults
