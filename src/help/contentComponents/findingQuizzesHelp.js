import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Bookmarks from './bookmarks'
import SideBar from './sideBar'
import ImageModal from '../../modal/imageModal'
import ToTopButton from '../../components/toTopButton'
import { showModal, hideModal } from '../../modal/actions'
import { setNotification } from '../../notifications/actions'
import history from '../../history'
import img1 from '../../public/help/FindingQuizzes/1.png'
import img2 from '../../public/help/FindingQuizzes/2-nameAdmin.png'
import img3 from '../../public/help/FindingQuizzes/3-nameReadOnly.png'
import img4 from '../../public/help/FindingQuizzes/4-catAdmin.png'
import img5 from '../../public/help/FindingQuizzes/5-catReadOnly.png'
import img6 from '../../public/help/FindingQuizzes/6-pdfAnotated.png'
import img7 from '../../public/help/FindingQuizzes/7-allAdmin.png'
import img8 from '../../public/help/FindingQuizzes/8-allReadOnly.png'


class FindingQuizzesHelp extends React.Component {

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
            <div className="title-large-spaced">Finding quizzes</div>
            <hr/>
            <Bookmarks page={"findingQuizzes"}/>
            <hr/>
            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="">
                In order to find quizzes, users have a number of options the first is to use the quiz search page.
              </div>
              <ol>
                <li>Click on the quiz search option in the nav bar drop down menu</li>
                <li>This will take you to the quiz search page where you can perform a search by either name or category.</li>
                <img
                  src={require(`../../public/help/FindingQuizzes/1.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img1)}}
                />
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div id="quizSearch" className="title-medium-left-alt bold">Quiz search</div>
              <div className="">
              </div>
              <ol>
                <li>
                  To search by name you will need to know the name of the quiz.  Enter it in the name field and click search.
                </li>
                <div className="helpImgContainer">
                  <div className="helpImgAlt">
                    <img
                      src={require(`../../public/help/FindingQuizzes/2-nameAdmin.png`)}
                      className="screenshot"
                      alt=""
                      onClick={() => {showModal(img2)}}
                    />
                    <div className="helpImgFooter">Options for ADMIN authors and SUPER-USERs</div>
                  </div>
                  <div className="helpImgAlt">
                    <img
                      src={require(`../../public/help/FindingQuizzes/3-nameReadOnly.png`)}
                      className="screenshot"
                      alt=""
                      onClick={() => {showModal(img3)}}
                    />
                    <div className="helpImgFooter">Options for READ-ONLY non author ADMIN users</div>
                  </div>
                </div>
                <li>
                  The results will render below the search sections.  Each quiz will be displayed, providing the name,
                  description and options.
                </li>
                <li>
                  You can click a quiz’s <Link to="/help/managingQuizzesHelp" className="helpLinkStandard">edit</Link> button to be taken to that quiz’s edit page or you can
                  directly <Link to="/help/managingQuizzesHelp" className="helpLinkStandard">delete</Link> the quiz.  Where a quiz has been marked as ready, there will be
                  an extra option allowing users to <Link to="/help/takingQuizzesHelp" className="helpLinkStandard">take the quiz</Link>.
                </li>
                <li>
                  To search by category, simply select a category form the drop down list and click search.
                </li>
                <div className="helpImgContainer">
                <div className="helpImgAlt">
                <img
                  src={require(`../../public/help/FindingQuizzes/4-catAdmin.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img4)}}
                />
                <div className="helpImgFooter">Options for ADMIN authors and SUPER-USERs</div>
                </div>
                <div className="helpImgAlt">
                <img
                  src={require(`../../public/help/FindingQuizzes/5-catReadOnly.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img5)}}
                />
                <div className="helpImgFooter">Options for READ-ONLY non author ADMIN users</div>
                </div>
                </div>
              </ol>

            </div>

            <div className="helpSectionSpacing">
              <div id="viewPdfOption" className="title-medium-left-alt bold">Viewing a PDF of a quiz</div>
              <div className="helpTextContainer">
                You can click on the pdf button in a quiz's options section to render a pdf of the quiz.
                In this view you will see the following:
              </div>
              <img
                src={require(`../../public/help/FindingQuizzes/6-pdfAnotated.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img6)}}
              />
              <div className="">
                <ol>
                  <li>The generated file name (this can be changed if you choose to save the pdf)</li>
                  <li>A button to rotate the pdf 90 degrees clockwise</li>
                  <li>A button to save the pdf</li>
                  <li>A button to print the pdf</li>
                  <li>A button to stretch or shrink the image</li>
                  <li>A button to zoom in</li>
                  <li>A button to zoom out</li>
                </ol>
              </div>
              <div className="warning-medium">
                <b><i className="fas fa-exclamation-triangle"></i> Note:</b>
                Please note that this option will only show if a quiz ststus has been set to <b>READY</b>
              </div>
            </div>

            <div className="helpSectionSpacing">
              <div id="browseQuizzes" className="title-medium-left-alt bold">Browse quizzes</div>
              <div className="">
                Another option is to use the Browse quizzes page which will let you browse through all available quizzes per category.
              </div>
              <div className="helpImgContainer">
              <div className="helpImgAlt">
              <img
                src={require(`../../public/help/FindingQuizzes/7-allAdmin.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img7)}}
              />
              <div className="helpImgFooter">Options for ADMIN authors and SUPER-USERs</div>
              </div>
              <div className="helpImgAlt">
              <img
                src={require(`../../public/help/FindingQuizzes/8-allReadOnly.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img8)}}
              />
              <div className="helpImgFooter">Options for READ-ONLY non author ADMIN users</div>
              </div>
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

export default connect(mapStateToProps, { showModal, hideModal, setNotification })(FindingQuizzesHelp)
