import React from 'react'
import { connect } from 'react-redux'
import SideBar from './sideBar'
import ImageModal from '../../modal/imageModal'
import ToTopButton from '../../components/toTopButton'
import { showModal, hideModal } from '../../modal/actions'
import { setNotification } from '../../notifications/actions'
import history from '../../history'
import img1 from '../../public/help/editUserPrivileges/1.png'
import img2 from '../../public/help/editUserPrivileges/2.png'
import img3 from '../../public/help/editUserPrivileges/3.png'
import img4 from '../../public/help/editUserPrivileges/4.png'
import img5 from '../../public/help/editUserPrivileges/5.png'
import img6 from '../../public/help/editUserPrivileges/6.png'

class EditUserPrivilegeHelp extends React.Component {

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
            <div className="helpSectionSpacing">
              <div className="title-large-spaced">Editing user privileges</div>
              <div className="title-medium-left-alt bold"></div>
              <div className="">
                To edit a user’s privilege first click on the drop down menu and select the ‘edit user privilege’ option.
              </div>
            </div>
            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="spacedParagraph">
                Next you will need to enter the user’s email address and then click the search button.  You will
                have received a request from a user to upgrade their access privilege which will contain the user’s
                email address.
              </div>
              <img
                src={require(`../../public/help/editUserPrivileges/1.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img1)}}
              />
              <img
                src={require(`../../public/help/editUserPrivileges/2.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img2)}}
              />
              <div className="warning spacedParagraph">
                <b><i className="fas fa-exclamation-triangle"></i> Note:</b> You won’t be allowed to perform the
                search without first entering an email address
              </div>
              <img
                src={require(`../../public/help/editUserPrivileges/3.png`)}
                className="screenshot"
                alt=""
                onClick={() => {showModal(img3)}}
              />
            </div>
            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="spacedParagraph">
                Once found, the user’s account details will be displayed below the search bar.
              </div>
              <img src={require(`../../public/help/editUserPrivileges/4.png`)} className="screenshot" alt="" onClick={() => {showModal(img4)}}/>
              <div className="spacedParagraph">
                You will also be provided with a drop down where you can select from the list of access privileges
                you which to set the user’s access privilege to.
              </div>
              <img src={require(`../../public/help/editUserPrivileges/5.png`)} className="screenshot" alt="" onClick={() => {showModal(img5)}}/>
              <div className="spacedParagraph">
                Select an option and then click save.
              </div>
              <img src={require(`../../public/help/editUserPrivileges/6.png`)} className="screenshot" alt="" onClick={() => {showModal(img6)}}/>
              <div className="spacedParagraph">
                A notification will be displayed confirming the successful change to the selected user's privilege level.
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

export default connect(mapStateToProps, { showModal, hideModal, setNotification })(EditUserPrivilegeHelp)
