import React from 'react';
import { connect } from 'react-redux';
import { del } from '../axiosRequests/requests'
import EditProfileForm from '../forms/editProfile'
import ChangePassword from '../forms/changePassword'
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

class ManageAccount extends React.Component {

  handleDelete = () => {
    const successMsg = "Your account has been deleted";
    const errorMsg = "An error has occurred, your account was not found";
    const {id, jwt} = this.props.userData
    const config = { data: { id: id } }
    del("users/deleteAccount", config, jwt).then((response) => {
      this.props.logOut();
      history.push('/');
      this.props.setNotification(successMsg, "success", true);
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        this.props.setNotification(errorMsg, "error", true);
      }
    });
  }

  render(){
    const { userData, setNotification, modalState, hideModal, showModal } = this.props;
    return(
      <div id="editProfileContainer">
      {console.log(this.props)}
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
          <img src={require('../public/icons/id.png')} id="idImg" alt=""/>
        </div>
        <div className="titleTextContainer">
          <div className="titleText">My Account</div>
        </div>
      </div>
        <div id="editProfileFormContainer">
          <EditProfileForm userData={userData} setNotification={setNotification}/>
          <div className="formDividers right"></div>
          <div className="formDividers left"></div>
          <ChangePassword userData={userData} setNotification={setNotification}/>
        </div>
        <hr/>
        <div id="deleteAccountContainer">
          <div id="deleteAccountTitle">Delete Account</div>
          <p>Please note that once you have deleted your account it will not be possible to retreive it.</p>
          <button className="delete" onClick={showModal}>Delete</button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    notificationData: state.notificationData,
    modalState: state.showModal
  };
}

export default connect(mapStateToProps, {setNotification, logOut, showModal, hideModal})(ManageAccount)
