import React from 'react';
import { connect } from 'react-redux'
import { setUserList, clearUserList } from './actions'

import '../stylesheets/userList.css'

export class UserList extends React.Component {

  componentDidMount(){
    this.props.setUserList("users", this.props.userData.jwt);
  }

  componentWillUnmount(){
    this.props.clearUserList()
  }

  renderList = () => {
    const { listOfUsers } = this.props
    let userList = listOfUsers.map(user => {
      return(
        <div key={listOfUsers.indexOf(user)} className="userDetails">
          <div className="forename">{user.forename}</div>
          <div className="surname">{user.surname}</div>
          <div className="email">{user.email}</div>
          <div className="permission">{user.permission}</div>
          <div className="verified">{user.verified === "true" ? "Yes" : "No"}</div>
        </div>
      );
    })
    return userList
  }

  renderHeaders = () => {
    return(
      <div className="userDetailHeaders">
        <div className="forenameHeader">First Name</div>
        <div className="surnameHeader">Surname</div>
        <div className="emailHeader">Email</div>
        <div className="permissionHeader">Permission</div>
        <div className="verifiedHeader">Verified?</div>
      </div>
    );
  }

  render(){
    return(
      <div className="componentContainer">
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

export default connect(mapStateToProps, { setUserList, clearUserList })(UserList)
