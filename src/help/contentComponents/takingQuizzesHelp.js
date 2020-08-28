import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SideBar from './sideBar'
import ImageModal from '../../modal/imageModal'
import { showModal, hideModal } from '../../modal/actions'
import img1 from '../../public/help/TakingQuizzes/1-anotated.png'
import img2 from '../../public/help/TakingQuizzes/2.png'
import img3 from '../../public/help/TakingQuizzes/3.png'
import img4 from '../../public/help/TakingQuizzes/4-anotated.png'
import img5 from '../../public/help/TakingQuizzes/5-anotated.png'

class TakingQuizzesHelp extends React.Component {

  componentDidMount(){
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
                  After confirming you want to start the quiz, you will be taken to that quiz’s Q&A page where you will
                  start the quiz.
                </li>
                <img
                  src={require(`../../public/help/TakingQuizzes/3.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img3)}}
                />
                <div className="">
                  The current question you are being asked is displayed on the left.
                </div>
                <div className="">
                  You will have a list of potential answers to pick from on the right.
                </div>
                <img
                  src={require(`../../public/help/TakingQuizzes/4-anotated.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img4)}}
                />
                <li>Select an answer and then click ‘next question’.</li>
                <li>When you answer the last question, you will be given your score.</li>
                <img
                  src={require(`../../public/help/TakingQuizzes/5-anotated.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img5)}}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalState: state.modalState
  }
}

export default connect(mapStateToProps, { showModal, hideModal })(TakingQuizzesHelp)
