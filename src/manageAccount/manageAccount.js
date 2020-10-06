import React from 'react';
import { connect } from 'react-redux';
import { del } from '../axiosRequests/requests'
import EditProfileForm from './forms/editProfile'
import ChangePassword from './forms/changePassword'
import PermissionChangeRequestForm from './forms/permissionChangeRequest'
import PermissionDetails from './permissionDetails'
import Notification from '../notifications/notifications'
import Modal from '../modal/modal'
import history from '../history'

import { setNotification } from '../notifications/actions'
import { logOut } from '../authentication/actions'
import { showModal, hideModal } from '../modal/actions'
import { sessionExpired } from '../utils/session'

import '../stylesheets/inputs.css';
import '../stylesheets/buttons.css';
import '../stylesheets/editProfile.css';

export class ManageAccount extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  handleDelete = () => {
    const successMsg = "Your account has been deleted";
    const errorMsg = "An error has occurred, your account was not found";
    const {id, jwt} = this.props.userData
    const { hideModal, logOut, setNotification } = this.props
    const config = { data: { id: id } }
    del("users/deleteAccount", config, jwt).then((response) => {
      hideModal()
      logOut()
      history.push('/')
      setNotification(successMsg, "success", true)
    }).catch((error) => {
      hideModal()
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        setNotification(errorMsg, "error", true);
      }
    });
  }

  renderPermissionChange = () => {
    const { permission, verified } = this.props.userData
    if(verified){
      return(
        <React.Fragment>
          <hr/>
          <div className="manageAccountRow">
            <PermissionChangeRequestForm />
            <PermissionDetails permission={permission}/>
          </div>
        </React.Fragment>
      );
    } else {
      return null
    }
  }

  render(){
    const { userData, setNotification, modalState, hideModal, showModal } = this.props;
    return(
      <div id="editProfileContainer" className="componentContainer">
      <Modal
        show={modalState.showModal}
        title={"Account"}
        message={"You are about to delete your account.  Once deleted your account will no longer be retreivable"}
        onDelete={this.handleDelete}
        onCancel={hideModal}
      />
      <Notification />
      <div id="editProfileTitle">
        <div className="titleImgContainer">
          <img src={require('../public/icons/idV2.png')} id="idImg" alt=""/>
        </div>
        <div className="titleTextContainer">
          <div className="titleText">My Account</div>
        </div>
      </div>
        <div className="manageAccountRow">
          <EditProfileForm userData={userData} setNotification={setNotification}/>
          <div className="rowImg">
            <img src={require("../public/icons/userDetails.png")} className="profileDetailsImg" alt=""/>
          </div>
        </div>
        <hr/>
        <div className="manageAccountRow">
          <ChangePassword userData={userData} setNotification={setNotification}/>
          <div className="rowImg">
            <img src={require("../public/icons/changePassword.png")} className="changePasswordImg" alt=""/>
          </div>
        </div>
        {this.renderPermissionChange()}
        <hr/>
        <div id="deleteAccountContainer">
          <div id="deleteAccountTitle">Delete Account</div>
          <p>Please note that once you have deleted your account it will not be possible to retreive it.</p>
          <button data-testid="delete-account" className="delete" onClick={showModal}>Delete</button>
        </div>
      </div>
    );
  }

}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    notificationData: state.notificationData,
    modalState: state.modalState,
    globals: state.globals
  };
}

export default connect(mapStateToProps, {setNotification, logOut, showModal, hideModal})(ManageAccount)
