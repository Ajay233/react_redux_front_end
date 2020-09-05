import React from 'react'
import { Link } from 'react-router-dom'

export const Answer = (props) => {

  const handleEdit = () => {
    const { setNotification, setCurrentAnswer, answer } = props
    setNotification()
    setCurrentAnswer(answer);
  }

  const handleDelete = () => {
    const { showModal, setCurrentAnswer, answer } = props
    showModal();
    setCurrentAnswer(answer);
  }

  const renderAnswer = () => {
    const { answerIndex, description, correctAnswer } = props.answer
    return(
      <div className="answerContainer">
        <div className="ansNumber">{ answerIndex }</div>
        <div className="ansDecription">{ description }</div>
        <div className="correctAns">{ renderCorrectAnswer(correctAnswer) }</div>
        {renderOptions()}
      </div>
    );
  }

  const renderCorrectAnswer = (correctAnswer) => {
    return correctAnswer ? <i className="far fa-check-circle green"></i> : <i className="far fa-times-circle red"></i>
  }

  const renderOptions = () => {
    const { permission } = props.userData;
    return(
      <div className="options">
        { renderDelete(permission) }
        { renderEdit(permission) }
      </div>
    );
  }

  const renderDelete = (permission) => {
    if(permission === "ADMIN" || permission === "SUPER-USER"){
      return(
        <Link
          to="#"
          id="deleteAnswer"
          className="deleteOption linkStandard"
          onClick={() => {handleDelete()}}
        >
          <i className="fas fa-trash-alt red"></i> Delete
        </Link>
      );
    } else {
      return null
    }
  }

  const renderEdit = (permission) => {
    if(permission === "ADMIN" || permission === "SUPER-USER"){
      return(
        <Link
          to="/editAnswer"
          id="editAnswer"
          className="edit linkStandard"
          onClick={() => {handleEdit()}}
        >
          <i className="fas fa-edit blue"></i> Edit
        </Link>
      );
    } else {
      return null
    }
  }

  return(
    <div>
      {renderAnswer()}
    </div>
  );
}

export default Answer
