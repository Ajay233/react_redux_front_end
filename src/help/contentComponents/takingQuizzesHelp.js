import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from './sideBar'

class TakingQuizzesHelp extends React.Component {
  render(){
    return(
      <div className="componentContainer-alt">

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
                <li>
                  When clicking on this option a pop u will ask you to confirm if you are sure you want to start the quiz.
                  This prevents the quiz from being started by accident.
                </li>
                <li>
                  After confirming you want to start the quiz, you will be taken to that quiz’s Q&A page where you will
                  start the quiz.
                </li>
                <div className="">
                  The current question you are being asked is displayed on the left.
                </div>
                <div className="">
                  You will have a list of potential answers to pick from on the right.
                </div>
                <li>Select an answer and then click ‘next question’.</li>
                <li>When you answer the last question, you will be given your score.</li>
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

export default TakingQuizzesHelp
