import React from 'react'
import { connect } from 'react-redux'
import SideBar from './sideBar'
import ImageModal from '../../modal/imageModal'
import ToTopButton from '../../components/toTopButton'
import { showModal, hideModal } from '../../modal/actions'
import { setNotification } from '../../notifications/actions'
import history from '../../history'
import img1 from '../../public/help/TakingQuizzes/1-anotated.png'
import img2 from '../../public/help/TakingQuizzes/2.png'
import img3 from '../../public/help/TakingQuizzes/3.png'
import img4 from '../../public/help/TakingQuizzes/4.png'
import img5 from '../../public/help/TakingQuizzes/5-anotated.png'
import img6 from '../../public/help/TakingQuizzes/6.png'
import img7 from '../../public/help/TakingQuizzes/7-anotated.png'

class TakingQuizzesHelp extends React.Component {

  componentDidMount(){
    if(!this.props.userData.loggedIn){
      history.push('/login')
      this.props.setNotification("Your session has expired, please log in to continue", "warning", true)
    }
    document.documentElement.scrollTop = 0;
  }

  render(){
    const { modalState, hideModal, showModal } = this.props
    return(
      <div className="componentContainer-alt">
          <ImageModal
            show={modalState.showModal}
            onCancel={hideModal}
            imgPath={modalState.imgPath}
          />
          <div className="helpSideBar">
            <SideBar />
          </div>
          <div className="helpContent">
            <div className="title-large-spaced">Taking a quiz</div>
            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="">
                To take a quiz you will first need to find a quiz using either the quiz search or browse all quizzes pages.
              </div>
              <ol>
                <li>
                  In addition to the quiz options for each quiz result, where a quiz has been marked as ready,
                  there is an option to take the quiz.  Clicking on this option will start the quiz.
                </li>
                <img
                  src={require(`../../public/help/TakingQuizzes/1-anotated.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img1)}}
                />
                <li>
                  When clicking on this option a pop up will ask you to confirm if you are sure you want to start the quiz.
                  This prevents the quiz from being started by accident.
                </li>
                <img
                  src={require(`../../public/help/TakingQuizzes/2.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img2)}}
                />
                <li>
                  After confirming you want to start the quiz, a quiz intro page will load, displaying the quiz title, the quiz
                  image (if one was added), the quiz description and the quiz author.
                </li>
                <img
                  src={require(`../../public/help/TakingQuizzes/3.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img3)}}
                />
                <li>
                  Once the intro page title and author animations complete, you will be taken to that quiz’s Q&A page where you will
                  start the quiz.
                </li>
                <img
                  src={require(`../../public/help/TakingQuizzes/4.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img4)}}
                />
                <div className="">
                  The current question you are being asked is displayed on the left.  You will have a list of potential
                  answers to pick from on the right.
                </div>
                <img
                  src={require(`../../public/help/TakingQuizzes/5-anotated.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img5)}}
                />
                <div className="">
                  If a question includes an image, the image will be displayed between the question and answer as shown below.
                </div>
                <img
                  src={require(`../../public/help/TakingQuizzes/6.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img6)}}
                />
                <li>Select an answer and then click ‘next question’.</li>
                <li>When you answer the last question, you will be given your score.</li>
                <img
                  src={require(`../../public/help/TakingQuizzes/7-anotated.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img7)}}
                />
                <li>
                  Once you have noted your score, click finish to exit back to the home page where you can continue
                  using the app.
                </li>
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="">
              </div>
            </div>

          </div>
          <ToTopButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    modalState: state.modalState
  }
}

export default connect(mapStateToProps, { showModal, hideModal, setNotification })(TakingQuizzesHelp)
