import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setNotification } from '../notifications/actions'
import { logOut } from '../authentication/actions'

import history from '../history'

import '../stylesheets/dropdown.css'

class DropdownList extends React.Component {

  logOut = () => {
    const { logOut, setNotification } = this.props
    logOut();
    setNotification("Logged out", "success", true);
    history.push("/");
  }

  renderSignUp = () => {
    const { loggedIn } = this.props.userData;
    return loggedIn === true ? null : <li><Link to="/signup" className="links">Create Account</Link></li>
  }

  renderLogin = () => {
    const { loggedIn } = this.props.userData;
    return loggedIn === true ? null : <li><Link to="/login" className="links">Login</Link><hr/></li>
  }

  renderLogout = () => {
    const { loggedIn } = this.props.userData;
    return loggedIn === true ? <li><button className="linkButton links" onClick={this.logOut}>Logout</button></li> : null
  }

  renderListUser = () => {
    const { loggedIn, permission } = this.props.userData;
    return loggedIn === true && permission === "ADMIN" ? <li><Link to="/userList" className="links">List all Users</Link><hr/></li> : null
  }

  renderQuizSearch = () => {
    const { loggedIn } = this.props.userData;
    return loggedIn === true ? <li><Link to="/quizSearch" className="links">Quiz search</Link><hr/></li> : null
  }

  renderManageAccount = () => {
    const { loggedIn } = this.props.userData;
    return loggedIn === true ? <li><Link to="/manageAccount" className="links">Manage my account</Link><hr/></li> : null
  }

  renderEditPrivilege = () => {
    const { loggedIn, permission } = this.props.userData;
    return loggedIn === true && permission === "ADMIN" ? <li><Link to="/editUserPrivilege" className="links">Edit Privileges</Link><hr/></li> : null
  }

  renderCreateQuiz = () => {
    const { loggedIn, permission } = this.props.userData;
    return loggedIn === true && permission === "ADMIN" ? <li><Link to={ { pathname: "/newQuiz", from: "dropdown" } } className="links">Create a Quiz</Link><hr/></li> : null
  }

// Todo:
// make a menu item - Manage Users
// make a sub menu for actions related to managing user to include:
//  - renderListUser
//  - renderEditPrivilege

  render(){
    return(
      <div className="list">
        <ul>
          {this.renderManageAccount()}
          {this.renderLogin()}
          {this.renderSignUp()}
          {this.renderListUser()}
          {this.renderEditPrivilege()}
          {this.renderQuizSearch()}
          {this.renderCreateQuiz()}
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

export default connect(mapStateToProps, { setNotification, logOut })(DropdownList)
