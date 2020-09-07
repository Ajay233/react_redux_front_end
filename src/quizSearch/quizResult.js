import React from 'react'
import { Link } from 'react-router-dom'

export const QuizResult = (props) => {

  const handleDelete = () => {
    props.setQuiz(props.quiz);
    props.showModal();
  }

  const handleView = () => {
    const { jwt, quiz, getQuestions, setQuiz, setNotification, clearQuizes } = props
    const param = { quizId: quiz.id }
    setNotification()
    clearQuizes()
    getQuestions("question/findByQuizId", param, jwt)
    setQuiz(quiz);
  }

  const handleStart = () => {
    const { quiz, setQuiz, showModal2 } = props
    setQuiz(quiz);
    showModal2();
  }

  const renderQuiz = () => {
    const { name, description, status } = props.quiz
    const { permission } = props;
    return(
      <div className="quiz">
        <div className={permission !== "USER" ? "quizName" : "quizNameExpanded"}>{name}</div>
        <div className="quizDescription">{description}</div>
        { permission !== "USER" ? <div className="quizStatus">{status}</div> : null }
        {renderOptions()}
      </div>
    );
  }

  const renderOptions = () => {
    const { permission } = props;
    const { status } = props.quiz
    return(
      <div className="options">
        { renderDelete(permission) }
        { renderView(permission) }
        { renderEdit(permission) }
        { renderStart(status) }
      </div>
    );
  }

  const renderDelete = (permission) => {
    if(permission === "ADMIN" || permission === "SUPER-USER"){
      return(
        <Link
          to="#"
          className="deleteOption linkStandard"
          onClick={ () => {handleDelete()} }
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
          to="/viewQuiz"
          className="view"
          onClick={ () => { handleView() } }
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
          to="/editQuiz"
          className="edit linkStandard"
          onClick={ () => { handleView() } }
        >
          <i className="fas fa-edit blue"></i> Edit
        </Link>
      );
    } else {
      return null
    }
  }

  const renderStart = (status) => {
    if(status === "READY"){
      return(
        <Link
          to="#"
          className="start linkStandard"
          onClick={ () => { handleStart() } }
        >
          <i className="far fa-play-circle blue"></i> Start
        </Link>
      );
    } else {
      return null
    }
  }

  return(
    <div className="quizContainer">
      {renderQuiz()}
    </div>
  );
}

export default QuizResult
