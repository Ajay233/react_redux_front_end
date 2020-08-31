import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Bookmarks from './bookmarks'
import SideBar from './sideBar'
import ImageModal from '../../modal/imageModal'
import ToTopButton from '../../components/toTopButton'
import { showModal, hideModal } from '../../modal/actions'
import img1 from '../../public/help/accountManagement/updatingUserDetails/1.png'
import img2 from '../../public/help/accountManagement/updatingUserDetails/2.png'
import img3 from '../../public/help/accountManagement/changingPassword/1.png'
import img4 from '../../public/help/accountManagement/changingPassword/2.png'
import img5 from '../../public/help/accountManagement/changingPassword/3.png'
import img6 from '../../public/help/accountManagement/changingPassword/4.png'
import img7 from '../../public/help/accountManagement/changingPassword/5.png'
import img8 from '../../public/help/accountManagement/privilegeChangeRequest/1.png'
import img9 from '../../public/help/accountManagement/privilegeChangeRequest/2.png'
import img10 from '../../public/help/accountManagement/deletingAccount/1.png'

class AccountManagementHelp extends React.Component {

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

            <div className="helpSectionSpacing">
              <div className="title-large-spaced">Account Management Help</div>
              <hr/>
              <Bookmarks page={"accountManagement"}/>
              <hr/>
              <div id="updatingUserDetails" className="title-medium-left-alt bold">Updating user details</div>
              <div className="spacedParagraph">
                The first row in the account management page provides you with the details currently
                held about you which were entered during sign up.
              </div>
              <img
                src={require(`../../public/help/accountManagement/updatingUserDetails/1.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img1)}}
              />
              <div className="spacedParagraph">
                You can change any of these fields by making the edits in the field and clicking submit.
              </div>
              <img
                src={require(`../../public/help/accountManagement/updatingUserDetails/2.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img2)}}
              />
              <div className="spacedParagraph">You will see a notification to confirm the request was successful</div>
            </div>
            <div className="helpSectionSpacing">
              <div id="updatingPassword" className="title-medium-left-alt bold">Updating your password</div>
              <div className="spacedParagraph">
                The second row gives you the option to change your password.  You will need to enter you old
                password and the the new password will need to be entered twice to ensure it is correct.
              </div>
              <img
                src={require(`../../public/help/accountManagement/changingPassword/1.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img3)}}
              />
              <div className="spacedParagraph">
                If any fields are left blank you will not be able to submit the form and you will recieve a notififcation
                above any fields left empty.
              </div>
              <img
                src={require(`../../public/help/accountManagement/changingPassword/2.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img4)}}
              />
              <div className="spacedParagraph">
                If the existing password you supplied was not matched you will get the notification below.
              </div>
              <img
                src={require(`../../public/help/accountManagement/changingPassword/3.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img5)}}
              />
              <div className="spacedParagraph">
                If the new and retyped passwords did not match, you will receive the notification below to confirm the request was unsuccessful and why.
              </div>
              <img
                src={require(`../../public/help/accountManagement/changingPassword/4.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img6)}}
              />
              <div className="spacedParagraph">If successful you will receive a confirmation email</div>
              <img
                src={require(`../../public/help/accountManagement/changingPassword/5.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img7)}}
              />
            </div>
            <div className="helpSectionSpacing">
              <div id="privilegeChangeRequest" className="title-medium-left-alt bold">Privilege change requests</div>
              <div className="spacedParagraph">
                If you need to gain a greater level of access to the app you will gave to have your access privilege raised.
                To do this you will have to make a request for a super-user to review and action.
              </div>
              <img
                src={require(`../../public/help/accountManagement/privilegeChangeRequest/1.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img8)}}
              />
              <div className="spacedParagraph">
                Simply select the level you want to be upgraded to and click submit.  N.B - the button is disabled by
                default and is only usable when you make a selection.
              </div>
              <div className="spacedParagraph">
                Once you have submitted the request, you will receive a notification to confirm the request has been made.
              </div>
              <div className="spacedParagraph">
                Once your request has been reviewed and actioned, you will receive an email to confirm your access
                privilege has been increased.  This will also confirm the level the super-user has set your privilege to.
              </div>
              <img
                src={require(`../../public/help/accountManagement/privilegeChangeRequest/2.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img9)}}
              />
            </div>
            <div className="helpSectionSpacing">
                <div id="deleteAccount" className="title-medium-left-alt bold">Delete account</div>
                <div className="spacedParagraph">
                  At the bottom of the page you have the option to delete your account.  Please note that this will
                  completely remove your account from the system.  We will not hold any details about your account
                  following this so it is important to note that it will be impossible to reverse this action.
                </div>
                <img
                  src={require(`../../public/help/accountManagement/deletingAccount/1.png`)}
                  className="screenshot"
                  alt=""
                  onClick={() => {showModal(img10)}}
                />
            </div>

          </div>
          <ToTopButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalState: state.modalState
  }
}

export default connect(mapStateToProps, { showModal, hideModal })(AccountManagementHelp)
