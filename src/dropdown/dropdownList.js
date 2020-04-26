import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { del } from '../axiosRequests/requests'
import '../stylesheets/dropdown.css'

class DropdownList extends React.Component {

  logOut = () => {
    this.props.logOutUser();
  }

  renderSignUp = () => {
    return this.props.userData.loggedIn === true ? null : <Link to="/signup" className="links">Go to Sign Up</Link>
  }

  renderLogin = () => {
    return this.props.userData.loggedIn === true ? null : <Link to="/login" className="links">Go to Login</Link>
  }

  renderLogout = () => {
    return this.props.userData.loggedIn === true ? <button className="linkButton links" onClick={this.logOut}>Logout</button> : null
  }

  renderListUser = () => {
    return this.props.userData.loggedIn === true ? <Link to="/userList" className="links">List all Users</Link> : null
  }

  handleDelete = () => {
    const {id, jwt} = this.props.userData
    console.log(id)
    console.log(jwt)
    const config = {
      data: {
        id: id
      }
    }
    del("users/deleteAccount", config, jwt).then((response) => {
      console.log("Deleted")
      // Need to clear reset redux store to clear all data
    }).catch((error) => {
      console.log(error.config)
    });

  }

  render(){
    return(
      <div className="list">
        <ul>
          <Link to="/editProfile" className="links">Edit Profile</Link>
          <hr/>
          <li className="links">Change Password</li>
          <hr/>
          <li onClick={this.handleDelete} className="links">Delete account</li>
          <hr/>
          <li>{this.renderLogin()}</li>
          <hr/>
          <li>{this.renderSignUp()}</li>

          <li>{this.renderLogout()}</li>

          <li>{this.renderListUser()}</li>
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

export default connect(mapStateToProps)(DropdownList)
