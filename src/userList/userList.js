import React from 'react';
import { connect } from 'react-redux'
import Notification from '../notifications/notifications'
import { setUserList, clearUserList, deleteUser } from './actions'

import '../stylesheets/userList.css'

export class UserList extends React.Component {

  componentDidMount(){
    this.props.setUserList("users", this.props.userData.jwt);
    document.documentElement.scrollTop = 0;
  }

  componentWillUnmount(){
    this.props.clearUserList()
  }

  deleteUser = (id) => {
    const { userData, deleteUser } = this.props
    const config = { data: { id: id } }
    deleteUser(config, userData.jwt)
  }

  renderList = () => {
    const { listOfUsers } = this.props
    let userList = listOfUsers.map(user => {
      return(
        <div key={listOfUsers.indexOf(user)} className="userDetails userContainer">
          <div className="forename">{user.forename}</div>
          <div className="surname">{user.surname}</div>
          <div className="email">{user.email}</div>
          <div className="permission">{user.permission}</div>
          <div className="verified">{ this.renderVerified(user.verified) }</div>
          <div className="deleteUser" onClick={() => {this.deleteUser(user.id)}}><i className="fas fa-trash-alt red"></i> Delete</div>
        </div>
      );
    })
    return userList
  }

  renderVerified = (verified) => {
    return verified ? <i className="far fa-check-circle green"></i> : <i className="far fa-times-circle red"></i>
  }

  renderHeaders = () => {
    return(
      <div className="userDetailHeaders userHeadings">
        <div className="forenameHeader">First Name</div>
        <div className="surnameHeader">Surname</div>
        <div className="emailHeader">Email</div>
        <div className="permissionHeader">Permission</div>
        <div className="verifiedHeader">Verified?</div>
        <div className="deleteUserHeader"></div>
      </div>
    );
  }

  render(){
    return(
      <div className="componentContainer">
        <Notification />
        <div className="title-large">List of all users</div>
        {this.renderHeaders()}
        {this.renderList()}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    listOfUsers: state.listOfUsers
  };
}

export default connect(mapStateToProps, { setUserList, clearUserList, deleteUser })(UserList)
