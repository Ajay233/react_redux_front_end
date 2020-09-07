import React from 'react'
import { Link } from 'react-router-dom'

export const Question = (props) => {

  const handleView = () => {
    const { question, userData, getAnswers, setCurrentQuestion, setNotification } = props
    const param = { questionId: question.id }
    setNotification()
    getAnswers(param, userData.jwt)
    setCurrentQuestion(question);
  }

  const handleDelete = () => {
    const { question, setCurrentQuestion, showModal } = props
    setCurrentQuestion(question);
    showModal();
  }

  const renderQuestion = () => {
    const { questionNumber, description } = props.question
    return(
      <div className="questionContainer">
        <div className="questionNumber">{questionNumber}</div>
        <div className="questionDescription">{description}</div>
        {renderOptions()}
      </div>
    )
  }

  const renderOptions = () => {
    const { permission } = props.userData;
    return(
      <div className="options">
        {renderDelete(permission)}
        {renderView(permission)}
        {renderEdit(permission)}
      </div>
    );
  }

  const renderDelete = (permission) => {
    if(permission === "ADMIN" || permission === "SUPER-USER"){
      return(
        <Link
          to="#"
          id="deleteQuestionRow"
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

  const renderView = (permission) => {
    if(permission === "READ-ONLY"){
      return(
        <Link
          to="/viewQuestion"
          className="view linkStandard"
          onClick={() => {handleView()}}
        >
          <i className="far fa-eye blue"></i> View
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
          to="/editQuestion"
          id="editQuestionRow"
          className="edit linkStandard"
          onClick={() => {handleView()}}
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
      {renderQuestion()}
    </div>
  );
}

export default Question
