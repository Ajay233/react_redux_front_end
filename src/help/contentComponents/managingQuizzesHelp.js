import React from 'react'
import { connect } from 'react-redux'
import Bookmarks from './bookmarks'
import SideBar from './sideBar'
import ImageModal from '../../modal/imageModal'
import ToTopButton from '../../components/toTopButton'
import { showModal, hideModal } from '../../modal/actions'
import { setNotification } from '../../notifications/actions'
import history from '../../history'

import createQuiz1 from '../../public/help/managingQuizzes/CreateQuiz/1.png'
import createQuiz2 from '../../public/help/managingQuizzes/CreateQuiz/2.png'
import createQuiz3 from '../../public/help/managingQuizzes/CreateQuiz/3.png'
import createQuiz4img from '../../public/help/managingQuizzes/CreateQuiz/4-withImg.png'
import createQuiz4noImg from '../../public/help/managingQuizzes/CreateQuiz/4-noImg.png'

import editQuizPage1 from '../../public/help/managingQuizzes/EditQuizPage/1v2.png'
import editQuizPage2 from '../../public/help/managingQuizzes/EditQuizPage/2v2.png'
import editQuizPage3 from '../../public/help/managingQuizzes/EditQuizPage/3.png'
import editQuizPage3img1 from '../../public/help/managingQuizzes/EditQuizPage/3-1.png'
import editQuizPage3img2 from '../../public/help/managingQuizzes/EditQuizPage/3-2.png'
import editQuizPage3img3 from '../../public/help/managingQuizzes/EditQuizPage/3-3.png'
import editQuizPage4 from '../../public/help/managingQuizzes/EditQuizPage/4.png'
import editQuizPage5 from '../../public/help/managingQuizzes/EditQuizPage/5.png'
import editQuizPage6 from '../../public/help/managingQuizzes/EditQuizPage/6.png'
import editQuizPage7 from '../../public/help/managingQuizzes/EditQuizPage/7.png'
import editQuizPage8 from '../../public/help/managingQuizzes/EditQuizPage/8.png'
import editQuizPage9 from '../../public/help/managingQuizzes/EditQuizPage/9-annotated.png'
import editQuizPage10 from '../../public/help/managingQuizzes/EditQuizPage/10.png'

import editQuestionPage1 from '../../public/help/managingQuizzes/EditQuestionPage/1.png'
import editQuestionPage2 from '../../public/help/managingQuizzes/EditQuestionPage/2.png'
import editQuestionPage3 from '../../public/help/managingQuizzes/EditQuestionPage/3.png'
import editQuestionPage4 from '../../public/help/managingQuizzes/EditQuestionPage/4.png'
import editQuestionPage5 from '../../public/help/managingQuizzes/EditQuestionPage/5.png'
import editQuestionPage6 from '../../public/help/managingQuizzes/EditQuestionPage/6-annotated.png'
import editQuestionPage7 from '../../public/help/managingQuizzes/EditQuestionPage/7.png'
import editQuestionPage8 from '../../public/help/managingQuizzes/EditQuestionPage/8.png'
import editQuestionPage9 from '../../public/help/managingQuizzes/EditQuestionPage/9.png'
import editQuestionPage10 from '../../public/help/managingQuizzes/EditQuestionPage/10.png'


class ManagingQuizzesHelp extends React.Component {

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
            <div className="title-large-spaced">Quiz management help</div>
            <hr/>
            <Bookmarks page={"managingQuizzes"}/>
            <hr/>
            <div className="helpSectionSpacing">
              <div id="creatingQuizzes" className="title-medium-left-alt bold">Creating a quiz</div>
              <div className="">
                If you have either Admin or Super-User privileges, then you will have the option to create a quiz
                in the nav bar drop menu.
              </div>
              <ol>
                <li>Select the option from the drop down list and you will be taken to the quiz creation page.</li>
                <img
                  src={require(`../../public/help/managingQuizzes/CreateQuiz/1.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(createQuiz1)}}
                />
                <li>Enter a name for your quiz, a description and a category.</li>
                <img
                  src={require(`../../public/help/managingQuizzes/CreateQuiz/2.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(createQuiz2)}}
                />
                <li>
                  There is also the option to upload an image which will be seen as part of the quiz
                  intro when a user starts the quiz.  It will also be seen in the title page of the quiz if a user
                  views a pdf of the quiz.
                </li>
                <img
                  src={require(`../../public/help/managingQuizzes/CreateQuiz/3.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(createQuiz3)}}
                />
                <div className="warning-medium">
                  <b><i className="fas fa-exclamation-triangle"></i> Note:</b> All fields, except the file upload, are mandatory and you will be notified of
                  this if you try to create a quiz without one of these fields filled out.
                </div>
                <li>Once you are ready, click save and continue</li>
                <li>This will take you to the edit quiz page where you can edit the quiz details, begin adding questions and answers</li>
                <div className="helpImgContainer">
                  <div className="helpImgAlt">
                    <img
                      src={require(`../../public/help/managingQuizzes/CreateQuiz/4-withImg.png`)}
                      className="screenshot"
                      alt=""
                      onClick={() => {showModal(createQuiz4img)}}
                    />
                    <div className="helpImgFooter">With image attached</div>
                  </div>
                  <div className="helpImgAlt">
                    <img
                      src={require(`../../public/help/managingQuizzes/CreateQuiz/4-noImg.png`)}
                      className="screenshot"
                      alt=""
                      onClick={() => {showModal(createQuiz4noImg)}}
                    />
                    <div className="helpImgFooter">No image attached</div>
                  </div>
                </div>
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div id="quizPage" className="title-medium-left-alt bold">The quiz page</div>
              <div className="">
                Below is a breakdown of the various sections of the edit quiz page.
              </div>
              <img
                src={require(`../../public/help/managingQuizzes/EditQuizPage/1v2.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(editQuizPage1)}}
              />
              <ol>
                <li>Quiz status badge showing the current status of the quiz.  This will be either DRAFT or READY</li>
                <li>The details of your quiz will be displayed here</li>
                <li>Options relating to the current quiz include Save, Delete and update quiz status</li>
                <li>Use this button to add questions to your quiz</li>
                <li>As questions are created, they will be displayed here</li>
                <li>
                  Back button which will take you back to the quiz search page (to navigate elsewhere,
                  use the nav bar drop down options)
                </li>
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div id="editQuizDetails" className="title-medium-left-alt bold">Editing quiz details</div>
              <div className="">
              </div>
              <ol>
                <li>
                  On the edit quiz page you can edit the details of a quiz by simply altering the details in the required field.
                </li>
                <li>Once you have made your changes, click ‘save changes’.</li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuizPage/2v2.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuizPage2)}}
                />
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div id="quizPageimgUpload" className="title-medium-left-alt bold">Uploading an image</div>
              <ol>
                <li>You can upload an image for your quiz by clicking the file upload button.</li>
              <img
                src={require(`../../public/help/managingQuizzes/EditQuizPage/3-1.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(editQuizPage3img1)}}
              />
              <li>Select the file you want to upload</li>
              <li>
                Then click on the save changes button and the image will be displayed to the
               right of the quiz details with a delete button underneath it
               </li>
               <div className="warning-medium">
                 <b><i className="fas fa-exclamation-triangle"></i> Note:</b> You can only upload one image for a quiz, so once you
                 have uploaded an image, the file upload input is hidden; however if you delete the image, the input will be displayed
                 again so you can upload a different image if required.
               </div>
              <li>If you want to delete the image form your quiz, click on the delete button</li>
              <img
                src={require(`../../public/help/managingQuizzes/EditQuizPage/3-2.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(editQuizPage3img2)}}
              />
              <li>A message will be displayed asking if you are sure you want to continue.  Click Delete to continue and delete the image</li>
              <li>A notififcation will be displayed confirming the image was successfully deleted</li>
              <img
                src={require(`../../public/help/managingQuizzes/EditQuizPage/3-3.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(editQuizPage3img3)}}
              />
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div id="deletingQuizzes" className="title-medium-left-alt bold">Deleting a quiz</div>
              <ol>
                <li>To delete a quiz simply click delete quiz</li>
                <li>
                  A pop up will ask you to confirm if you want to proceed.  This prevents any a quiz from being
                  accidentally deleted
                </li>
                <div className="warning-medium">
                  <b><i className="fas fa-exclamation-triangle"></i> Note:</b> As highlighted in the pop up message, if you
                  delete a quiz, any questions and answers you created for the quiz will also be deleted.
                </div>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuizPage/3.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuizPage3)}}
                />
                <li>Click continue to delete the quiz</li>
                <li>
                  Once deleted you will be redirected to the search page so you can continue to use the app from here.
                  A notification will also be rendered to confirm the quiz was successfully deleted.
                </li>
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div id="quizStatus" className="title-medium-left-alt bold">Quiz Status</div>
              <div className="">
                Each quiz has a status indicator next to the quiz title which shows if the quiz is in draft mode
                or if it is ready for users to use.
              </div>
              <ol>
                <li>To change the quiz status click on the ‘mark as ready’ button.</li>
                <div className="warning-medium">
                  <b><i className="fas fa-exclamation-triangle"></i> Note:</b> The app will only allow you to set a
                  quiz status to ready if your quiz meets the following criteria:
                  <ul>
                    <li> - Has at least one question</li>
                    <li> - Each question relating to the quiz has at least one correct answer and one wrong answer</li>
                  </ul>
                </div>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuizPage/4.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuizPage4)}}
                />
                <li>
                  Provided the criteria above are met you will see the status change and a success notification will
                  be shown, indicating the status was successfully changed.  The button will also change from ‘mark as
                  ready’ to ‘revert to draft’.
                </li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuizPage/5.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuizPage5)}}
                />
              </ol>
              <div className="">
                If the quiz has been marked as ready, to revert the quiz back to draft mode click the ‘revert to draft’ button.
              </div>
            </div>

            <div className="helpSectionSpacing">
              <div id="addQuestion" className="title-medium-left-alt bold">Add a question</div>
              <div className="">
              </div>
              <ol>
                <li>To add a question, click ‘add a question’.</li>
                <li>This will take you to the question creation page</li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuizPage/6.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuizPage6)}}
                />
                <li>Enter a question number (this must be a number). </li>
                <li>Enter a description for your question.</li>
                <li>There is also an option to upload an image if you would like to include one as part of the question.</li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuizPage/7.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuizPage7)}}
                />
                <div className="warning-medium">
                  <b><i className="fas fa-exclamation-triangle"></i> Note:</b> All fields, except the file upload, are
                  mandatory so if you leave the any fields empty or enter anything other than a number in the question number field,
                  a warning notification will be displayed.
                </div>
                <li>Once you are happy with this, click save to create the question</li>
              </ol>
              <div className="">
                You will be redirected back to the quiz page and will receive a notification confirming that the
                question was successful created.
              </div>
              <img
                src={require(`../../public/help/managingQuizzes/EditQuizPage/8.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(editQuizPage8)}}
              />
              <div className="">
                You will also see the question details rendered below the quiz details.
              </div>
            </div>

            <div className="helpSectionSpacing">
              <div id="manageQuestions" className="title-medium-left-alt bold">Managing a quiz’s questions</div>
              <div className="">
                Each question has options to the right of it which correspond to that particular question.
              </div>
              <img
                src={require(`../../public/help/managingQuizzes/EditQuizPage/9-annotated.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(editQuizPage9)}}
              />
            </div>

            <div className="helpSectionSpacing">
              <div id="deletingQuestions" className="title-medium-left-alt bold">Deleting a question</div>
              <ol>
                <li>
                  To delete a question, simply click the delete button for the question you want to delete.
                </li>
                <li>
                  A pop up will ask you to confirm if you want to proceed.  This prevents any a question from
                  being accidentally deleted.
                </li>
                <div className="warning-medium">
                  <b><i className="fas fa-exclamation-triangle"></i> Note:</b> As highlighted in the pop up message,
                  if you delete a question, any answers you created for the quiz will also be deleted.
                </div>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuizPage/10.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuizPage10)}}
                />
                <li>
                  A notification will be show to indicate that the question was successfully deleted.  You will also
                  see that the question has been removed from the list of questions on the quiz page.
                </li>
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div id="editQuestions" className="title-medium-left-alt bold">Editing questions</div>
              <ol>
                <li>
                  The other option that you will see with each question is ‘edit’.  Click on edit to edit the
                  question details and add answers.
                </li>
                <li>
                  After clicking the edit button, you will be taken to the question page which has a similar
                  layout to the quiz page.  If you uploaded an image you will see that it has been added to the right of the
                  question details, similarly to the quiz details page.  There is an option to delete the image, which works in the
                  same way as on the quiz details page.
                </li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuestionPage/1.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuestionPage1)}}
                />
                <li>To edit the question details simply make the desired changes in the question fields.</li>
                <li>
                  Then click save changes.  A notification will be displayed to indicate that the changes have been saved.
                </li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuestionPage/2.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuestionPage2)}}
                />
              </ol>
              <div className="warning-medium">
                <b><i className="fas fa-exclamation-triangle"></i> Note:</b> If you edit the question number, the app will
                automatically reorder the question in the question list accordingly so that your questions are always
                in ascending number order.
              </div>
              <div className="">
                The question page also has a delete question button which you can use to delete the question.
                This works as described in the <a href="#deletingQuestions" className="helpLinkStandard">deleting a question section</a>.
              </div>
              <img
                src={require(`../../public/help/managingQuizzes/EditQuestionPage/3.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(editQuestionPage3)}}
              />
            </div>

            <div className="helpSectionSpacing">
              <div id="addAnswer" className="title-medium-left-alt bold">Adding an answer</div>
              <ol>
                <li>To add an answer, click add an answer.</li>
                <li>This will take you to the answer creation page.</li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuestionPage/4.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuestionPage4)}}
                />
                <li>Enter an answer number (this must be a number).</li>
                <div className="warning-medium">
                  <b><i className="fas fa-exclamation-triangle"></i> Note:</b> This field is mandatory so if you leave
                  the field blank or enter anything other than a number a warning notification will be displayed.
                </div>
                <li>Enter a description for your answer.</li>
                <div className="warning-medium">
                  <b><i className="fas fa-exclamation-triangle"></i> Note:</b> This field is mandatory so if you leave
                  the field blank a warning notification will be displayed.
                </div>
                <li>Select whether the answer is correct or incorrect from the drop down.</li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuestionPage/5.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuestionPage5)}}
                />
                <li>
                  Once you are happy with the content, click save to create the answer.  You will be redirected to
                  the question page where a notification will displayed to indicate the answer was created successfully.
                  You will also see the answer rendered below the question details.
                </li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuestionPage/6-annotated.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuestionPage6)}}
                />
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div id="manageAnswers" className="title-medium-left-alt bold">Managing a question’s answers</div>
              <div className="">
                Each answer is rendered below the question details similarly to how the questions are rendered
                on the quiz page.   Each answer has options to the right of it which correspond to that particular answer.
              </div>

            </div>

            <div className="helpSectionSpacing">
              <div id="editAnswers" className="title-medium-left-alt bold">Editing answers</div>
              <ol>
                <li>To edit an answer simply click on an answer’s ‘edit’ button.</li>
                <li>
                  After clicking the edit button, you will be taken to the edit answer page which has a
                  similar layout to the create answer page.
                </li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuestionPage/7.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuestionPage7)}}
                />
                <li>To edit the answer details simply make the desired changes in the answer fields</li>
                <li>
                  Then click save changes.  You will be redirected to the question page where a notification
                  will displayed to indicate the answer was created updated.  You will also see the updated answer
                  below the question details which will include the changes you made.
                </li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuestionPage/8.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuestionPage8)}}
                />
              </ol>
              <div className="warning-medium">
                <b><i className="fas fa-exclamation-triangle"></i> Note:</b> If you edit the answer number, the app
                will automatically reorder the question in the question list accordingly so that your questions are
                always in ascending number order.
              </div>
            </div>

            <div className="helpSectionSpacing">
              <div id="deleteAnswer" className="title-medium-left-alt bold">Deleting an answer</div>
              <div className="">
              </div>
              <ol>
                <li>To delete an answer, simply click the delete button for the answer you want to delete.</li>
                <li>
                  A pop up will ask you to confirm if you want to proceed.  This prevents any a answer from being
                  accidentally deleted
                </li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuestionPage/9.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuestionPage9)}}
                />
                <li>
                  A notification will be show to indicate that the answer was successfully deleted.  You will also
                  see that the answer has been removed from the list of answers on the question page.
                </li>
                <img
                  src={require(`../../public/help/managingQuizzes/EditQuestionPage/10.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(editQuestionPage10)}}
                />
              </ol>
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

export default connect(mapStateToProps, { showModal, hideModal, setNotification })(ManagingQuizzesHelp)
