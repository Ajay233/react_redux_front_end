import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setNotification } from '../notifications/actions'
import '../stylesheets/dropdown.css'

class DropdownList extends React.Component {

  logOut = () => {
    this.props.logOutUser();
    this.props.setNotification("Logged out", "success", true);
  }

  renderSignUp = () => {
    return this.props.userData.loggedIn === true ? null : <li><Link to="/signup" className="links">Create Account</Link></li>
  }

  renderLogin = () => {
    return this.props.userData.loggedIn === true ? null : <li><Link to="/login" className="links">Login</Link><hr/></li>
  }

  renderLogout = () => {
    return this.props.userData.loggedIn === true ? <li><button className="linkButton links" onClick={this.logOut}>Logout</button></li> : null
  }

  renderListUser = () => {
    return this.props.userData.loggedIn === true ? <li><Link to="/userList" className="links">List all Users</Link><hr/></li> : null
  }

  renderDeleteAccount = () => {
    return this.props.userData.loggedIn === true ? <li onClick={this.handleDelete} className="links">Delete account <hr/></li> : null
  }

  renderChangePassword = () => {
    return this.props.userData.loggedIn === true ? <li className="links">Change Password <hr/></li> : null
  }

  renderEditProfile = () => {
    return this.props.userData.loggedIn === true ? <li><Link to="/editProfile" className="links">Edit Profile</Link><hr/></li> : null
  }

  renderEditPrivilege = () => {
    return this.props.userData.loggedIn === true ? <li><Link to="/editUserPrivilege" className="links">Edit Privileges</Link><hr/></li> : null
  }

  render(){
    return(
      <div className="list">
        <ul>
          {this.renderEditProfile()}
          {this.renderChangePassword()}
          {this.renderDeleteAccount()}
          {this.renderLogin()}
          {this.renderSignUp()}
          {this.renderListUser()}
          {this.renderEditPrivilege()}
          {this.renderLogout()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps, { setNotification })(DropdownList)
