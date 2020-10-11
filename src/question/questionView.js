import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Answers } from '../answer/answers'
import UpdateQuestionForm from './forms/updateQuestion'
import Notification from '../notifications/notifications'
import Modal from '../modal/modal'
import FilePlaceholder from '../components/filePlaceholder'
import history from '../history'

import { setNotification } from '../notifications/actions'
import { hideModal, showModal, showModal2, showModal3 } from '../modal/actions'
import { setCurrentAnswer, deleteAnswer } from '../answer/actions'
import { deleteQuestion, deleteImage } from '../question/actions'

import '../stylesheets/question.css'
import '../stylesheets/answer.css'

export class QuestionView extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  renderModal = () => {
    const { currentAnswer, hideModal, currentQuestion } = this.props
    const { showModal, showModal2, showModal3 } = this.props.modalState
    if(showModal === true){
      return(
        <Modal
          type={"delete"}
          show={showModal}
          title={"Delete Answer"}
          message={`You are about to delete answer ${currentAnswer.answerIndex}.  Do you want to continue?`}
          onDelete={this.handleDeleteAnswer}
          onCancel={hideModal}
        />
      );
    } else if(showModal2 === true){
      return(
        <Modal
          type={"delete"}
          show={showModal2}
          title={"Delete Question"}
          message={`You are about to delete question ${currentQuestion.questionNumber}, this will also delete any associated answers for this question.  Do you want to continue?`}
          onDelete={this.handleDeleteQuestion}
          onCancel={hideModal}
        />
      );
    } else if(showModal3 === true){
      return(
        <Modal
          show={showModal3}
          title={"Delete Image"}
          message={`You are about to delete the image for this question.  Do you want to continue?`}
          onDelete={this.handleDeleteImg}
          onCancel={hideModal}
        />
      );
    } else {
      return null
    }
  }

  renderAnswers = () => {
    const { answers, userData, setCurrentAnswer, setNotification, deleteAnswer, showModal, quiz } = this.props;
    return answers.length === 0 ? null :
    <Answers
      answers={answers}
      userData={userData}
      setCurrentAnswer={setCurrentAnswer}
      setNotification={setNotification}
      deleteAnswer={deleteAnswer}
      showModal={showModal}
      quiz={quiz}
    />
  }

  renderDetails = () => {
    const { currentQuestion, quiz } = this.props
    return(
      <React.Fragment>
        <div className="questionViewTitle">{`Question ${currentQuestion.questionNumber} from the ${quiz.name} quiz`}</div>
        <div className={"questionDetailsContainerLarge"}>
          <div className="detailsHeading">Question description:</div>
          <div className="detailsContent">{ currentQuestion.description }</div>
        </div>
      </React.Fragment>
    );
  }

  renderImg = () => {
    const { showModal3 } = this.props
    return(
      <div className="questionImageArea">
        {this.renderQuestionImage()}
        <div className="link deleteImg" onClick={() => showModal3()}>
          {this.renderDeleteImg()}
        </div>
      </div>
    );
  }

  renderDeleteImg = () => {
    if(history.location.pathname === '/editQuestion'){
      return <span><i className="fas fa-trash-alt red"></i> Delete Image</span>
    } else {
      return null
    }
  }

  renderFormOrDetails = () => {
    const { currentQuestion, userData } = this.props
    if(history.location.pathname === "/editQuestion"){
      return(
        <div className={currentQuestion.imgUrl !== null ? 'questionFormArea' : ''}>
          <div className={currentQuestion.imgUrl !== null ? 'questionForm' : ''}>
            <UpdateQuestionForm triggerModal={this.triggerModal}/>
          </div>
          {currentQuestion.imgUrl !== null ? this.renderImg() : null}
        </div>
      );
    } else {
      return(
        <div className={'questionFormArea'}>
          <div className={'questionForm'}>
            {this.renderDetails()}
          </div>
          {currentQuestion.imgUrl !== null ? this.renderImg() : null}
          {this.renderPlaceholder(currentQuestion.imgUrl, userData.permission)}
        </div>
      );
    }
  }

  renderPlaceholder = (imgUrl, permission) => {
    if(imgUrl === null && permission !== "ADMIN" && permission !== "SUPER-USER"){
      return(
        <div className="questionImageArea">
        <FilePlaceholder type={'question'} permission={permission}/>
        </div>
      );
    } else {
      return null
    }
  }

  renderQuestionImage = () => {
    const { currentQuestion } = this.props
    return currentQuestion.imgUrl || currentQuestion.imgUrl !== null ? <div className="imgView"><img src={currentQuestion.imgUrl} alt="" className="preview"/></div> : null
  }

  handleDeleteAnswer = () => {
    const { currentAnswer, userData, deleteAnswer } = this.props;
    const config = {
      data: [currentAnswer]
    }
    deleteAnswer(config, userData.jwt)
  }

  handleDeleteQuestion = () => {
    const { currentQuestion, userData, deleteQuestion } = this.props;
    const config = {
      data: [currentQuestion]
    }
    deleteQuestion(config, userData.jwt)
  }

  handleDeleteImg = () => {
    const { currentQuestion, userData, deleteImage } = this.props;
    const config = {
      params: {
        questionId: currentQuestion.id,
        url: currentQuestion.imgUrl
      }
    }
    deleteImage(config, userData.jwt)
  }

  clearNotification = () => {
    const { setNotification } = this.props
    setNotification()
  }

  renderAddButton = () => {
    if(history.location.pathname === '/editQuestion'){
      return(
        <Link to="/newAnswer" className="addButton linkStandard" onClick={this.clearNotification}>
          <i className="fas fa-plus-circle green"></i> Add an answer
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

  renderBackButton = () => {
    if(history.location.pathname === '/viewQuestion'){
      return <Link to="/viewQuiz" className="link back" onClick={this.clearNotification}><i className="fas fa-chevron-circle-left blue"></i> Back</Link>
    } else {
      return <Link to="/editQuiz" className="link back" onClick={this.clearNotification}><i className="fas fa-chevron-circle-left blue"></i> Back</Link>
    }
  }

  render(){
    return(
      <div id="questionView" className="componentContainer">
        {this.renderModal()}
        {this.renderBackButton()}
        <Notification />
        {this.renderFormOrDetails()}
        <div className="headerContainer">
          <div id="answersTitle">Answers</div>
          {this.renderAddButton()}
        </div>
        <div id="answerHeadings" className="answerHeadings">
          <div id="numberHeader">Answer</div>
          <div id="descriptionHeader">Description</div>
          <div id="correctAnswerHeading">Correct answer?</div>
          <div id="optionsHeader"></div>
        </div>
        <div id="answers">
          {this.renderAnswers()}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quiz: state.quiz,
    currentQuestion: state.currentQuestion,
    answers: state.answers,
    currentAnswer: state.currentAnswer,
    modalState: state.modalState
  }
}

export default connect(mapStateToProps,
  {
    setNotification,
    hideModal,
    deleteAnswer,
    setCurrentAnswer,
    deleteQuestion,
    deleteImage,
    showModal,
    showModal2,
    showModal3
  })(QuestionView)
