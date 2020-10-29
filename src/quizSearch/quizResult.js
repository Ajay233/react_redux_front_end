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

  const renderEditOrView = (permission, quiz, userId) => {
    if (quiz.status === 'READY'){
      if (quiz.authorId === userId || permission === "SUPER-USER"){
        return renderEdit()
      } else {
        return renderView()
      }
    } else if((quiz.authorId === userId && permission === "ADMIN") || permission === "SUPER-USER") {
      return renderEdit()
    } else if(permission !== 'USER') {
      return renderView()
    } else {
      return null
    }
  }

  const renderDelete = (permission, quiz, userId) => {
    if (quiz.authorId === userId || permission === "SUPER-USER"){
      return deleteButton()
    } else {
      return null
    }
  }

  const renderOptions = () => {
    const { permission, quiz, userId } = props;
    const { status } = props.quiz
    return(
      <div className="options">
        { renderDelete(permission, quiz, userId) }
        { renderEditOrView(permission, quiz, userId) }
        { renderPdf(status) }
        { renderStart(status) }
      </div>
    );
  }

  const deleteButton = (permission) => {
    return(
      <Link
        to="#"
        className="deleteOption linkStandard"
        onClick={ () => {handleDelete()} }
      >
        <i className="fas fa-trash-alt red"></i> Delete
      </Link>
    );
  }

  const renderView = () => {
    return(
      <Link
        to="/viewQuiz"
        className="view linkStandard"
        onClick={ () => { handleView() } }
      >
        <i className="far fa-eye blue"></i> View
      </Link>
    );
  }

  const renderEdit = () => {
    return(
      <Link
        to="/editQuiz"
        className="edit linkStandard"
        onClick={ () => { handleView() } }
      >
        <i className="fas fa-edit blue"></i> Edit
      </Link>
    );
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

  const handleRenderPdf = () => {
    const { jwt, quiz, setQuiz, setQuizDownloadData } = props
    const param = { id: quiz.id }
    setQuiz(quiz);
    setQuizDownloadData(param, jwt)
  }

  const renderPdf = (status) => {
    if(status === "READY"){
      return(
        <Link
          to="#"
          className="start linkStandard"
          onClick={ () => { handleRenderPdf() } }
        >
          <i className="far fa-file-pdf red"></i> PDF
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
