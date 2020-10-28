import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Notification from '../notifications/notifications'
import Questions from '../question/questions'
import UpdateQuizForm from './forms/updateQuiz'
import Modal from '../modal/modal'
import Loading from '../components/loading'
import { getQuestions, deleteQuestion, setCurrentQuestion } from '../question/actions'
import { setNotification } from '../notifications/actions'
import { getAnswers } from '../answer/actions'
import { setQuiz, updateQuizStatus, deleteQuiz, deleteQuizImage } from './actions'
import { hideModal, showModal, showModal2, showModal3 } from '../modal/actions'
import history from '../history'

import '../stylesheets/quiz.css'

export class QuizView extends React.Component {

  componentDidMount(){
    if(!this.props.userData.loggedIn){
      history.push('/login')
      this.props.setNotification("Your session has expired, please log in to continue", "warning", true)
    }
    document.documentElement.scrollTop = 0;
  }

  renderModal = () => {
    const { hideModal, currentQuestion } = this.props
    const { showModal, showModal2, showModal3 } = this.props.modalState
    if(showModal === true){
      return(
        <Modal
          show={showModal}
          title={"Delete Question"}
          message={`You are about to delete question ${currentQuestion.questionNumber}, this will also delete any associated answers for this question.  Do you want to continue?`}
          onDelete={this.handleDeleteQuestion}
          onCancel={hideModal}
        />
      );
    } else if(showModal2 === true) {
      return (
        <Modal
          show={showModal2}
          title={"Delete Quiz"}
          message={"You are about to delete this quiz which will also delete any questions and answers associated with it.  Do you want to continue?"}
          onDelete={this.handleDeleteQuiz}
          onCancel={hideModal}
        />
      );
    } else if(showModal3 === true){
      return(
        <Modal
          show={showModal3}
          title={"Delete Image"}
          message={`You are about to delete the image for this quiz.  Do you want to continue?`}
          onDelete={this.handleDeleteImg}
          onCancel={hideModal}
        />
      );
    } else {
      return null
    }
  }

  handleDeleteQuestion = () => {
    const { currentQuestion, userData, deleteQuestion } = this.props;
    const config = { data: [currentQuestion] }
    deleteQuestion(config, userData.jwt)
  }

  handleDeleteQuiz = () => {
    const { quiz, userData, deleteQuiz } = this.props;
    const config = { data: quiz }
    deleteQuiz(config, userData.jwt)
  }

  handleDeleteImg = () => {
    const { quiz, userData, deleteQuizImage } = this.props;
    const config = {
      params: {
        id: quiz.id,
        imgUrl: quiz.imgUrl
      }
    }
    deleteQuizImage(config, userData.jwt)
  }

  // renderDetails = () => {
  //   const { name, description, category } = this.props.quiz
  //   return(
  //     <React.Fragment>
  //       <div id="quizTitle">{name}</div>
  //       <div className="quizStatus">Status: {this.renderStatus()}</div>
  //       <div className="detailsContainer">
  //         <div className="detailsHeading">Description:</div>
  //         <div className="detailsContent">{description}</div>
  //       </div>
  //       <div className="detailsContainer">
  //         <div className="detailsHeading">Category:</div>
  //         <div className="detailsContent">{category}</div>
  //       </div>
  //     </React.Fragment>
  //   );
  // }

  renderDetails = () => {
    const { description, category, imgUrl, name, author } = this.props.quiz
    return(
      <div className={imgUrl !== null ? 'quizFormArea' : ''}>
        <div className={imgUrl !== null ? 'quizForm' : ''}>
          <div>
          <div id="quizTitle">{name}</div>
          <div className={imgUrl !== null ? "detailsContainerLarge" : "detailsContainer"}>
            <div className="detailsHeading">Description:</div>
            <div className="detailsContent">{description}</div>
          </div>
          <div className={imgUrl !== null ? "detailsContainerLarge" : "detailsContainer"}>
            <div className="detailsHeading">Category:</div>
            <div className="detailsContent">{category}</div>
          </div>
          <div className={imgUrl !== null ? "detailsContainerLarge" : "detailsContainer"}>
            <div className="detailsHeading">Created by:</div>
            <div className="detailsContent">{author}</div>
          </div>
          <div className={imgUrl !== null ? "detailsContainerLarge" : "detailsContainer"}>
            <span className="bold">Status:</span> {this.renderStatus()}
          </div>
          </div>
        </div>
        {imgUrl !== null ? this.renderImg() : null}
      </div>
    );
  }

  renderQuizImage = () => {
    const { quiz } = this.props
    return quiz.imgUrl || quiz.imgUrl !== null ? <div className="imgView"><img src={quiz.imgUrl} alt="" className="preview"/></div> : null
  }

  renderImg = () => {
    const { showModal3 } = this.props
    return(
      <div className="quizImageArea">
        {this.renderQuizImage()}
        <div className="link deleteImg" onClick={() => showModal3()}>
          {this.renderDeleteImg()}
        </div>
      </div>
    );
  }

  renderDeleteImg = () => {
    if(history.location.pathname === '/editQuiz'){
      return <span><i className="fas fa-trash-alt red"></i> Delete Image</span>
    } else {
      return null
    }
  }

  renderHeadings = () => {
    const { name } = this.props.quiz
    if(history.location.pathname === "/editQuiz"){
      return(
        <React.Fragment>
          <div id="quizTitle">{`Edit the ${name} ${name.includes("quiz") || name.includes("Quiz") ? "" : "quiz"}`}</div>
          <div className="quizStatusBadge">Status: {this.renderStatus()}</div>
        </React.Fragment>
      );
    } else {
      return null
    }
  }

  // renderUpdateForm = () => {
  //   const { name } = this.props.quiz
  //   return(
  //     <React.Fragment>
  //       <div id="quizTitle">{`Edit the ${name} ${name.includes("quiz") || name.includes("Quiz") ? "" : "quiz"}`}</div>
  //       <div className="quizStatusBadge">Status: {this.renderStatus()}</div>
  //       <UpdateQuizForm triggerModal={this.triggerModal} updateStatus={this.updateStatus}/>
  //     </React.Fragment>
  //   );
  // }

  renderUpdateForm = () => {
    const { imgUrl } = this.props.quiz
    return(
      <div className={imgUrl !== null ? 'quizFormArea' : ''}>
        <div className={imgUrl !== null ? 'quizForm' : ''}>
          <UpdateQuizForm triggerModal={this.triggerModal} updateStatus={this.updateStatus}/>
        </div>
        {imgUrl !== null ? this.renderImg() : null}
      </div>
    );
  }

  renderDetailsOrUpdate = () => {
    return history.location.pathname === "/editQuiz" ? this.renderUpdateForm() : this.renderDetails()
  }

  renderQuestions = () => {
    const { questions } = this.props;
    return questions.length === 0 ? null : <Questions questions={questions}/>
  }

  clearNotification = () => {
    const { setNotification } = this.props
    setNotification()
  }

  renderAddButton = () => {
    if(history.location.pathname === "/editQuiz"){
      return(
        <Link to="/newQuestion" className="addButton linkStandard" onClick={this.clearNotification}>
          <i className="fas fa-plus-circle green"></i> Add a question
        </Link>
      );
    } else {
      return null
    }
  }

  triggerModal = (event) => {
    event.preventDefault()
    this.props.showModal2()
  }

  updateStatus = (event) => {
    event.preventDefault()
    const { quiz, updateQuizStatus, userData } = this.props;
    const data = {
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
      category: quiz.category,
      status: quiz.status === "DRAFT" ? "READY" : "DRAFT"
    }
    updateQuizStatus("quiz/updateStatus", data, userData.jwt)
  }

  renderStatus = () => {
    const { quiz } = this.props;
    return quiz.status === "DRAFT" ? <span className="draftFlag"><i className="fas fa-pencil-ruler"></i> Currenty in Draft</span> : <span className="readyFlag"><i className="far fa-check-circle"></i> Ready for use</span>
  }

  renderOptions = () => {
    const { permission } = this.props.userData
    return permission === "ADMIN" ? <div>{this.renderStatusButton()}</div> : null
  }

  renderQuestions = () => {
    const { questions, showModal, userData, getAnswers, setCurrentQuestion, deleteQuestion, setNotification } = this.props
    return( questions.length === 0 ? null :
      <Questions
        questions={questions}
        userData={userData}
        getAnswers={getAnswers}
        setCurrentQuestion={setCurrentQuestion}
        setNotification={setNotification}
        deleteQuestion={deleteQuestion}
        showModal={showModal}
      />
    );
  }

  render(){
    return(
      <div id="quiz" className="componentContainer">
        <Loading loaderState={this.props.globals.loaderState}/>
        {this.renderModal()}
        <Notification />
        {this.renderHeadings()}
        {this.renderDetailsOrUpdate()}
        <div className="headerContainer">
          <div id="questionsTitle">Questions</div>
          {this.renderAddButton()}
        </div>
        <div id="questionHeadings" className="questionHeadings">
          <div id="questionNumberHeader">Answer</div>
          <div id="questionDescriptionHeader">Description</div>
          <div id="questionOptionsHeader"></div>
        </div>
        {this.renderQuestions()}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quiz: state.quiz,
    questions: state.questions,
    currentQuestion: state.currentQuestion,
    modalState: state.modalState,
    lists: state.lists,
    quizDownloadData: state.quizDownloadData,
    globals: state.globals
  }
}

export default connect(mapStateToProps,
  { getQuestions,
    setCurrentQuestion,
    setQuiz,
    setNotification,
    hideModal,
    deleteQuestion,
    deleteQuiz,
    deleteQuizImage,
    showModal,
    showModal2,
    showModal3,
    updateQuizStatus,
    getAnswers
  })(QuizView)
