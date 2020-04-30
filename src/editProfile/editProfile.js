import React from 'react';
import { connect } from 'react-redux';
import { del } from '../axiosRequests/requests'
import EditProfileForm from '../forms/editProfile'
import ChangePassword from '../forms/changePassword'
import Notification from '../notifications/notifications'

import { setNotification } from '../notifications/actions'
import { logOutUser } from '../authentication/actions'

import '../stylesheets/inputs.css';
import '../stylesheets/buttons.css';
import '../stylesheets/editProfile.css';

class EditProfile extends React.Component {

  handleDelete = () => {
    const successMsg = "Your account has been deleted";
    const errorMsg = "An error has occurred, your account was not found";
    const {id, jwt} = this.props.userData
    console.log(id)
    console.log(jwt)
    const config = {
      data: {
        id: id
      }
    }
    del("users/deleteAccount", config, jwt).then((response) => {
      this.props.logOutUser();
      this.props.setNotification(successMsg, "success", true);
    }).catch((error) => {
      this.props.setNotification(errorMsg, "error", true);
    });
  }

  render(){
    const { userData, setNotification } = this.props;
    return(
      <div id="editProfileContainer">
      <Notification />
      <div id="editProfileTitle">
        <div className="titleImgContainer">
          <img src={require('../public/icons/id.png')} id="idImg" alt=""/>
        </div>
        <div className="titleTextContainer">
          <div className="titleText">Edit Profile</div>
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
          <button className="delete" onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    notificationData: state.notificationData
  };
}

export default connect(mapStateToProps, {setNotification, logOutUser})(EditProfile)
