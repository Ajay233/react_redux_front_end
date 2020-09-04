import React from 'react';
import { Link } from 'react-router-dom';

import history from '../../history'

import '../../stylesheets/dropdown.css'

const DropdownList = (props) => {

  const logOut = () => {
    const { logOut, setNotification } = props
    logOut();
    history.push("/");
    setNotification("Logged out", "success", true);
  }

  const clearNotifications = () => {
    const { setNotification } = props
    setNotification();
  }

  const renderSignUp = () => {
    return <li><Link to="/signup" className="links" onClick={ () => {clearNotifications() } }>Create Account</Link></li>
  }

  const renderLogin = () => {

    return <li><Link to="/login" className="links" onClick={ () => {clearNotifications() } }>Login</Link><hr/></li>
  }

  const renderLogout = () => {

    return <li><button id="logOutButton" className="linkButton links" onClick={ () => {logOut()} }>Logout</button></li>
  }

  const renderListUser = () => {
    const { permission } = props
    return(
      permission === "SUPER-USER" ?
      <li><Link to="/userList" className="links" onClick={ () => { clearNotifications() } }>List all Users</Link><hr/></li> : null
    );
  }

  const renderQuizSearch = () => {
    return <li><Link to="/quizSearch" className="links" onClick={ () => { handleGoToSearch() } }>Quiz search</Link><hr/></li>
  }

  const renderManageAccount = () => {
    return <li><Link to="/manageAccount" className="links" onClick={ () => { clearNotifications() } }>Manage my account</Link><hr/></li>
  }

  const renderEditPrivilege = () => {
    const { permission } = props;
    return(
      permission === "SUPER-USER" ?
      <li>
        <Link to="/editUserPrivilege" className="links" onClick={ () => { clearNotifications() } }>Edit Privileges</Link>
        <hr/>
      </li> : null
    );
  }

  const renderCreateQuiz = () => {
    const { permission } = props;
    return(
      permission === "ADMIN" || permission === "SUPER-USER" ?
      <li>
        <Link
          to={ { pathname: "/newQuiz", from: "dropdown" } }
          className="links"
          onClick={ () => { clearNotifications() }}
        >
          Create a Quiz
        </Link>
        <hr/>
      </li> : null
    );
  }

  const renderBrowseAllQuizes = () => {
    return <li><Link id="browseAllQuizzes" to="/allQuizes" onClick={ () => {handleViewAll()}} className="links">Browse All Quizes</Link><hr/></li>;
  }

  const renderHelp = () => {
    return <li><Link to="/help" className="links" onClick={ () => {clearNotifications() }}>Help</Link><hr/></li>;
  }

  const handleViewAll = () => {
    const { getAllQuizes, clearQuizes, setNotification, jwt } = props
    setNotification()
    clearQuizes()
    getAllQuizes("quiz/getAll", jwt)
  }

  const handleGoToSearch = () => {
    const { clearQuizes, setNotification } = props
    setNotification()
    clearQuizes()
  }

  const renderLoggedInOptions = () => {
    return(
      <React.Fragment>
        {renderManageAccount()}
        {renderListUser()}
        {renderEditPrivilege()}
        {renderBrowseAllQuizes()}
        {renderQuizSearch()}
        {renderCreateQuiz()}
        {renderHelp()}
        {renderLogout()}
      </React.Fragment>
    );
  }

  const renderPreLogInOptions = () => {
    return(
      <React.Fragment>
        {renderLogin()}
        {renderSignUp()}
      </React.Fragment>
    );
  }

  const renderListOptions = () => {
    const { loggedIn } = props
    return props.loggedIn ? renderLoggedInOptions() : renderPreLogInOptions()
  }

// Todo:
// make a menu item - Manage Users
// make a sub menu for actions related to managing user to include:
//  - renderListUser
//  - renderEditPrivilege

  return(
    <div className="list">
      <ul>
        {renderListOptions()}
      </ul>
    </div>
  );
}

export default DropdownList
